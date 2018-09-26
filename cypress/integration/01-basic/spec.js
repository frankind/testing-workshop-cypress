/// <reference types="cypress" />
// @ts-check
describe("First test", () => {
  beforeEach('Before each', () => {
    Cypress.config("defaultCommandTimeout", 10000)
  })
  it('loads', () => {
    // application should be running at port 3000
    cy.visit('localhost:3000')
    // this assertion fails on purpose
    // can you fix it?
    cy.contains('Part of TodoMVC')
  })
  afterEach('After each', () => {
    cy.screenshot("testscreenshotja")
  })
})