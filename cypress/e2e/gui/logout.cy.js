describe('Logout', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('successfully', () => {
        cy.logout()

        cy.location('pathname')
        .should('eq', '/users/sign_in')
    })
})