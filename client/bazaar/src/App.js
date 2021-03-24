import './App.css';
import World from './components/world/index'
import Booth from './components/Booth'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import { setSocketConnect } from './store/action';


function App() {
	
  const dispatch = useDispatch()

  // const {socketConnect} = useSelector((state) => state.socketConnect)

  useEffect(() => {
    dispatch(setSocketConnect(io.connect("http://localhost:3001")))
  }, [dispatch])


  return (
    <div className="App">
      {/* <div>
      <World></World>
      </div>
      <div>
      <Socket></Socket>
      </div> */}
      <Router>
        <Switch>
          <Route exact path='/game'>
            <World />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/register'>
            <Register />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
        <Switch>
          <Route exact path='/buy-product' component={Booth} />
        </Switch>
        <Switch>
          <Route exact path='/both' component={Booth} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
