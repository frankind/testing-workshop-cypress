/// <reference types="cypress" />
beforeEach('Visit Page before test', () => {
  cy.visit('/')
  cy.contains('a', 'TodoMVC')
})
// it('loads', () => {
//   // application should be running at port 3000
//   cy.visit('localhost:3000')
//   cy.contains('a', 'TodoMVC')
// })

it('starts with zero items', () => {
  // TODO check if the list is empty initially
  // find the selector for the individual TODO items in the list
  // use cy.get(...) and it should have length of 0
  cy.get('.todo').should('have.length', 0)
})

it('adds two items', () => {
  // repeat twice
  //    get the input field
  //    type text and "enter"
  //    assert that the new Todo item
  //    has been added added to the list
  cy.get('.new-todo').type('first item{enter}')
  cy.contains('li.todo', 'first item').should('be.visible')
  cy.get('.new-todo').type('second item{enter}')
  cy.contains('li.todo', 'second item').should('be.visible')
})

function addTodo(input) {
  cy.get('.new-todo').type(input + '{enter}')
}

it('can add many items', () => {
  const N = 5
  var data = 0;
  cy.get('li.todo').then(($el) => {
    data = $el.length
    console.log('data: ' + data)
    for (let k = 0; k < N; k += 1) {
      // add an item
      // probably want to have a reusable function to add an item!
      addTodo('item_' + k)
    }
    var expectItem = data + N
    // check number of items
    cy.get('li.todo').should('have.length', expectItem)
  })

})

it('can mark items as completed', () => {
  // add a few items
  addTodo('simple')
  // mark items as completed
  cy
    .contains('li.todo', 'simple')
    .should('exist')
    .find('input[type="checkbox"]')
    .check()
  // select completed items and confirm their number
  cy.contains('li.todo', 'simple').find('.destroy').click({
    force: true
  })
  cy.contains('li.todo', 'simple').should('not.exist')
})
after('Delete all todo list', () => {

  //Get size
  cy.get('li.todo').find('.destroy').then(($els) => {
    var total = $els.length
    for (let i = 0; i < total; i++) {
      $els[i].click({
        force: true
      })
    }
  })
})
// what a challenge?
// test more UI at http://todomvc.com/examples/vue/