import { faker } from '@faker-js/faker'

// Opção utilizada para permitir a visualização combinada
// de comandos de API e interações de UI no Cypress,
// já que este teste utiliza ambos no mesmo fluxo
const options = { env: { snapshotOnly: true } }

describe('Set label on issue', options, () => {

  /**
   * Dados de entrada do teste.
   *
   * Esses objetos representam apenas o input necessário
   * para criar os recursos via API.
   *
   * IDs reais (project_id, iid, etc.) não são definidos aqui,
   * pois são gerados pelo backend e retornados na resposta da API.
   */
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(4),
    project: {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(4)
    }
  }

  const label = {
    name: `label-${faker.random.words(1)}`,
    color: '#FF0000'
  }

  /**
   * Setup do cenário feito via API.
   *
   * Objetivo:
   * - garantir ambiente limpo
   * - criar projeto e issue via API
   * - criar label no projeto correto
   * - abrir a issue correta na interface gráfica
   *
   * Ao final do beforeEach, o sistema já está no estado
   * necessário para executar o teste de GUI.
   */
  beforeEach(() => {

    // Remove projetos existentes para evitar interferência
    // de testes anteriores
    cy.api_deleteProjects()

    // Realiza login para permitir chamadas autenticadas
    // de API e interações via UI
    cy.login()

    // Cria a issue via API.
    // A resposta contém os identificadores reais criados
    // pelo backend (project_id, iid, etc.)
    cy.api_createIssue(issue)
      .then(response => {

        /**
         * response.body.project_id:
         * ID técnico do projeto criado no backend.
         * Utilizado pela API para operações relacionadas ao projeto,
         * como criação de labels.
         */
        cy.api_createLabel(response.body.project_id, label)

        /**
         * A interface gráfica do GitLab utiliza:
         * - o nome do projeto no path da URL
         * - o iid da issue para identificação na UI
         *
         * Por isso, a navegação usa issue.project.name + response.body.iid,
         * e não o id técnico retornado pela API.
         */
        cy.visit(
          `/${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`
        )
      })
  })

  /**
   * Teste de comportamento via interface gráfica.
   *
   * Aqui não há criação de dados nem chamadas de API.
   * O teste valida apenas a ação do usuário
   * e o resultado visual esperado.
   */
  it('successfully', () => {

    // Associa a label existente à issue aberta
    // simulando a interação do usuário
    cy.gui_setLabelOnIssue(label)

    // Verifica que a label foi aplicada à issue
    // validando a presença do nome no bloco de labels
    cy.get('.qa-labels-block')
      .should('contain', label.name)

    // Valida a cor da label conforme exibida na interface.
    // O assert utiliza o estilo inline aplicado pelo GitLab,
    // garantindo que a cor correta foi renderizada na UI.
cy.get('.qa-labels-block span')
  .should('have.attr', 'style')
  .and('contain', `background-color: ${label.color}`)
  })
})
