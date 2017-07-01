import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import GoogleLogin from './GoogleLogin'
import TodosList from './TodosList'

if (localStorage.getItem('email') === null) {
  window.history.pushState('', '', '/')
} else {
  window.history.pushState('', '', '/todos')
}

const App = () => (
  <Router>
    <div>
      <Route path="/" component={GoogleLogin}  />
      <Route path="/todos" component={TodosList} />
    </div>
  </Router>
)

export default App
