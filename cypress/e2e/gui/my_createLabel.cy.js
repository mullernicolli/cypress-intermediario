// fiz sozinha seguindo exemplo dos anteriores, diferente do exercício proposto pelo professor mas funcional, serviu de prática.
// apenas cria uma label via GUI, com comando personalizado GUI e apenas passando alguns comandos de API no teste.


import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('My Create Label', options, () => {
    const label = {
        name: faker.random.words(1),
        description: faker.random.words(3),
        background_color: '#FF0000',
        project: {
            name: faker.datatype.uuid(),
            description: faker.random.words(3),
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(label.project)
        cy.visit(`/${Cypress.env('user_name')}/${label.project.name}/-/labels/new`)
    })

    it('successfully', () => {
        cy.gui_createLabel(label)

        cy.get('.label-list-item')
        .should('contain', label.name)
        .should('contain', label.description)
    })
})