import React from 'react'
import PropTypes from 'prop-types'

const Todos = ({ todo, deleteTodo }) => {
  const handleClick = () => deleteTodo(todo)
  return (
    <div className="todo-list-item">
      <p>{todo}</p>
      <button className="btn" onClick={handleClick}>Delete</button>
    </div>
  )
}

Todos.PropTypes = {
  todo: PropTypes.string,
  deleteTodo: PropTypes.func,
}
export default Todos
