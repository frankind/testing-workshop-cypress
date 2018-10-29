/// <reference types="cypress" />
beforeEach('Visit Page before test', () => {
  cy.visit('/')
})

it('loads', () => {
  // application should be running at port 300
  cy.contains('a', 'TodoMVC')
})

it('starts with zero items', () => {
  // TODO check if the list is empty initially
  // find the selector for the individual TODO items in the list
  // use cy.get(...) and it should have length of 0
  // cy.get('input.toggle').should('have.length', 0)
  deleteAllItem()
  cy.get('li.todo').should('have.length', 0)
})

it('adds two items', () => {
  // repeat twice
  //    get the input field
  //    type text and "enter"
  //    assert that the new Todo item
  //    has been added added to the list
  cy.get('input.new-todo').type('hello{enter}')
  // This does not work due to it in label element
  // cy.get('li.todo').should('have.text', 'hello') 
  cy.contains('li.todo', 'hello').should('be.visible')
  cy.get('input.new-todo').type('hello2{enter}')
  cy.contains('li.todo', 'hello2').should('be.visible')
  deleteAllItem()
})

const deleteAllItem = () => {
  cy.get('.destroy').then(($el) => {
    const items = $el.length
    if (items >= 1) {
      cy.get('.destroy').click({
        multiple: true,
        force: true
      })
    }
  })
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

const getTodoItems = () => {
  return cy.get('li.todo')
}
const addItem = message => {
  cy.get('input.new-todo').type(`${message}{enter}`)
}

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
  console.log("Test: " + getTodoItems().length)
  getTodoItems().should('have.length', 7)
  getTodoItems().then(($el) => {
    console.log("Test: " + $el.length)
  })
  console.log("Test: " + getTodoItems().length)
  cy.pause()
  // cy.pause()
  //Get size
  getMyToDoItems().then(($els) => {
    var total = $els.length
    for (let i = 0; i < total; i++) {
      $els[i].click({
        force: true
      })
    }
  })
})

const getTodoApp = () => cy.get('.todoapp')
const getTodoItems = () => getTodoApp().find('.todo-list').find('li')
const getMyToDoItems = () => cy.get('li.todo').find('.destroy')
// function getTodoItems() {
//   return cy.get('li.todo').find('.destroy')
// }
// what a challenge?
// test more UI at http://todomvc.com/examples/vue/