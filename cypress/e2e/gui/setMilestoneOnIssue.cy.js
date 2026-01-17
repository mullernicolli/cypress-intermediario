import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Set milestone on issue', options, () => {
    const milestone = {
        title: `mlstone-${faker.random.words(1)}`,
    }

    const issue = {
        title: faker.datatype.uuid(),
        description: faker.random.words(4),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(4),
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
        .then(response => {
            cy.api_createMilestone(response.body.project_id, milestone)
            cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
        })
    })

    it('successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.block.milestone').should('contain', milestone.title)
    })
})