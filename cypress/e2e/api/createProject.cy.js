import { faker } from '@faker-js/faker'

describe('Create Project (API)', () => {

  // Pré-condição:
  // Garantir ambiente limpo antes de validar a criação via API
  beforeEach(() => {
    cy.api_deleteProjects()
  })

  it('creates a project successfully via API', () => {

    // Dados de entrada da requisição
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    // Ação:
    // Enviar requisição para criação de projeto
    cy.api_createProject(project)
      .then(response => {

        // Validação de contrato da API
        expect(response.status).to.equal(201)

        // Validação dos dados persistidos no backend
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
      })
  })
})
