import './App.css'
import React from 'react'
// import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Merchants from './pages/Merchants'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'

export default function App(props) {
  return (
    <div>
      {/* <Switch> */}
      {/* </Switch> */}
          {/* <Switch>
          </Switch> */}
            {/* <div className="flex flex-wrap bg-gray-100 w- full h-screen">  */}
        {/* <Sidebar /> */}
        {/* <div className="w-9/12"> */}
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
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>

        {/* </div> */}
        
      </div>
    // </div>
  )
}
