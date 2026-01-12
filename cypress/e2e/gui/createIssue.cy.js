/* logar
visitar a url pra criação de issue
preencher titulo descrição
salvar
confirmar que foi criada de alguma forma */

import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Issue', options, () => {
    const issue = {
        name: faker.datatype.uuid(),
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach (() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(issue.project)
    })

    it('successfully', () => {
        cy.gui_createIssue(issue)

        cy.get('.issue-details')
        .should('contain', issue.name)
        .and('contain', issue.description)
    })
})