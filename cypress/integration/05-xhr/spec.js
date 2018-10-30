/// <reference types="cypress" />
// note, we are not resetting the server before each test
// and we want to confirm that IF the application has items already
// (for example add them manually using the browser localhost:3000)
// then these tests fail!

it('starts with zero items (waits)', () => {
  cy.visit('/')
  // wait 1 second
  cy.wait(1000)
  // then check the number of items
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network proxy with cy.server()
  cy.server()
  // spy on route `GET /todos`
  //  with cy.route(...).as(<alias name>)
  cy.route('GET','/todos').as('todos')
  // THEN visit the page
  cy.visit('/')
  // wait for `GET /todos` route
  //  using "@<alias name>" string
  cy
    .wait('@todos')
    // .its('responseBody')
    // .should('have.length',0)

  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (stubbed response)', () => {
  // start Cypress network server
  // stub `GET /todos` with []
  // save the stub as an alias
  cy.server()
  cy.route('GET','/todos',[]).as('todos')
  // THEN visit the page
  cy.visit('/')

  // wait for the route alias
  // grab its response body
  // and make sure the body is an empty list
  cy
    .wait('@todos')
    .its('responseBody')
    .should('have.length',0)
})

it('starts with zero items (fixture)', () => {
  // start Cypress network server
  // stub `GET /todos` with fixture "empty-list"
  cy.server()
  cy.route('GET','/todos','fixture:empty-list.json').as('todos')
  // visit the page
  cy.visit('/')
  cy
    .wait('@todos')
    .its('responseBody')
    .should('have.length',0)
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('posts new item to the server', () => {
  // start Cypress network server
  // spy on "POST /todos", save as alias
  cy.server()
  cy.route('POST','/todos').as('new-item')
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')

  // wait on XHR call using the alias, grab its request or response body
  // and make sure it contains
  // {title: 'test api', completed: false}
  // hint: use cy.wait(...).its(...).should('have.contain', ...)
  cy
    .wait('@new-item')
    .its('requestBody')
    .should('have.contain',{title: 'test api', completed: false})
})

it('loads several items from a fixture', () => {
  // start Cypress network server
  // stub route `GET /todos` with data from a fixture file "two-items.json"
  // THEN visit the page
  cy.server()
  cy.route('GET','/todos','fixture:two-items.json').as('two-items')
  cy.visit('/')
  // then check the DOM: some items should be marked completed
  // we can do this in a variety of ways
  cy
    .wait('@two-items')
    .its('responseBody')
    .should('have.length',2)

  cy.get('li.todo').should('have.length',2)
  cy
    .contains('.todo','first item from fixture')
    .should('not.have.class','completed')
    .find('.toggle')
    .should('not.be.checked')

  cy
    .contains('.todo','second item from fixture')
    .should('have.class','completed')
    .find('.toggle')
    .should('be.checked')
})
