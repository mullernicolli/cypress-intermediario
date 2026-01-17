const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`  // definindo uma variável para o token para que eu possa reaproveitá-la em todo o código sem precisar ficar escrevendo tudo isso dnv (bearer....)

Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_getAllProjects', () => {
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  cy.api_getAllProjects().then(res =>
    res.body.forEach(project => cy.request({
      method: 'DELETE',
      url: `/api/v4/projects/${project.id}`,
      headers: { Authorization: accessToken },
    }))
  )
})

Cypress.Commands.add('api_createIssue', issue => {
  cy.api_createProject(issue.project)
    .then(response => {
      cy.request({
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`,
        body: {
          title: issue.title,
          description: issue.description
        },
        headers: { Authorization: accessToken },
      })
  })
})

// IMPORTANTE:
    // - projectId é apenas o nome do parâmetro da função (JavaScript)
    // - o valor real vem da resposta da API (response.body.project_id)
    // - aqui o comando não sabe de onde esse ID veio, apenas o utiliza
Cypress.Commands.add('api_createLabel', (projectId, label) => {
  cy.request({
    method: 'POST',

    // Endpoint da API do GitLab responsável pela criação de labels.
    // O projectId é interpolado na URL porque a API exige
    // que a label seja criada dentro de um projeto específico.
    url: `/api/v4/projects/${projectId}/labels`,

    // Corpo da requisição enviado para a API.
    // Contém os campos necessários para criar a label no projeto.
    body: {
      name: label.name,
      color: label.color
    },

    headers: {
      // Header HTTP usado para autenticação da requisição.
      // "Authorization" é o header esperado pela API do GitLab.
      //
      // O valor segue o formato:
      // Bearer <access_token>
      //
      // "Bearer" indica o tipo de autenticação,
      // e o token identifica o usuário que está realizando a ação.
      Authorization: `Bearer ${Cypress.env('gitlab_access_token')}`
    }
  })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones`,
    body: {
      title: milestone.title,
    },

    headers: { Authorization: accessToken },

  })
})