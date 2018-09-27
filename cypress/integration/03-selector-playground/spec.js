/// <reference types="cypress" />
beforeEach(() => {
  // application should be running at port 3000
  // and the "localhost:3000" is set as "baseUrl" in "cypress.json"
  cy.visit('/')
})
it('loads', () => {
  cy.contains('a', 'TodoMVC')
})
/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = text => {
  // write Cy commands here to add the new item
  cy.get('[data-cy=input]').type(`${text}{enter}`)
}
it('adds two items', () => {
  addItem('first item')
  addItem('second item')
  // fill the selector
  cy.get('[data-cy=todo]').should('have.length', 2)
})

after(() => {
  // Old style to click each element
  // cy.get('[data-cy=remove]').then(($el) => {
  //   var total = $el.length
  //   for (let i = 0; i < total; i++) {
  //     $el[i].click({
  //       force: true
  //     })
  //   }
  // })

  // Modern style from Cypress to click all
  cy.get('[data-cy=remove]').click({
    force: true,
    multiple: true
  })
})