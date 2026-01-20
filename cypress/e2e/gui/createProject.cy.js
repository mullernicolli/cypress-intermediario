import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Project (GUI)', options, () => {

  // PRÉ-CONDIÇÕES:
  // 1. Garantir que não existam projetos previamente criados
  // 2. Garantir que o usuário esteja autenticado no sistema
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })

  it('successfully', () => {

    // DADOS DE TESTE:
    // Informações válidas para criação de um novo projeto
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    // EXECUÇÃO DO TESTE:
    // O usuário cria um projeto utilizando o formulário da interface gráfica
    cy.gui_createProject(project)

    // RESULTADO ESPERADO:
    // 1. O usuário deve ser redirecionado para a página do projeto criado
    cy.url().should(
      'be.equal',
      `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`
    )

    // 2. O nome do projeto deve ser exibido na interface
    cy.contains(project.name).should('be.visible')

    // 3. A descrição do projeto deve ser exibida na interface
    cy.contains(project.description).should('be.visible')
  })
})
