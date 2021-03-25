// import './App.css'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Merchants from './pages/Merchants'
import Login from './pages/Login'
// import './index.css';
import Register from './pages/Register'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function App() {
  
  const history = useHistory()

  useEffect(() => {
    if (window.location.pathname === '/register') {
      history.push('/register')
    } else {
      if (localStorage.access_token === 'undefined' || !localStorage.access_token) {
        history.push('/login')
      } else {
        history.push('/')
      }
    }
  }, [history])

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/merchants">
          <Merchants />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  )
}
