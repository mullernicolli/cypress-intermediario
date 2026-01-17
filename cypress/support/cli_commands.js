/* Cypress.Commands.add('cloneViaSSH', project => {
  const domain = Cypress.config('baseUrl').replace('http://', '')

  cy.exec(`cd cypress/downloads/ && git clone git@${domain}:${Cypress.env('user_name')}/${project.name}.git`)
}) */


// ajuste chatgpt, pois o do professor não estava funcionando.
Cypress.Commands.add('cloneViaSSH', project => {
  const domain = Cypress.config('baseUrl')
    .replace('http://', '')
    .replace('https://', '')
    .split(':')[0]

  cy.exec(
    `cd cypress/downloads && git clone git@${domain}:${Cypress.env('user_name')}/${project.name}.git`
  )
})
