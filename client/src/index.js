import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import BookingPage from './components/BookingPage'
import AddMovie from './components/AddMovie'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'

const history = createBrowserHistory()

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route path='/add-movie'>
          <AddMovie />
        </Route>
        <Route path='/booking-page/:movieId'>
          <BookingPage />
        </Route>
        <Route path='/'>
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
)
