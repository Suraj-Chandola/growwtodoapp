import React, { Component } from 'react'
import Todos from './Todos'
import './index.scss'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        'Watch UEFA champions league final',
        'Pay broadband Bill',
        'Call mom',
      ]
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.setState({
        todos: [...this.state.todos, e.target.value]
      })
      e.target.value = ''
    }
  }

  deleteTodo(todo) {
    const newstate = this.state.todos
    if (newstate.indexOf(todo) > -1) {
      newstate.splice(newstate.indexOf(todo), 1)
      this.setState({
        todos: newstate
      })
    }
  }

  render() {
    const { todos } = this.state
    return (
      <div className="container">
        <div className="search-input">
          <input type="text" onKeyUp={this.handleKeyUp} />
        </div>
        <div className="todo-list-container">
          <h4>Todos List</h4>
          {todos.map(todo => (
            <Todos
              key={todo}
              todo={todo}
              deleteTodo={this.deleteTodo}
            />
          ))}
          {todos.length === 0 && <div>No todo</div>}
        </div>
      </div>
    )
  }
}
