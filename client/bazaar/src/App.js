import './App.css';
import World from './components/world/index'
import Booth from './components/Booth'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import { useEffect } from 'react';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { setSocketConnect } from './store/action';
// import "nes.css/css/nes.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
	
  const dispatch = useDispatch()

  // const {socketConnect} = useSelector((state) => state.socketConnect)

  const history = useHistory()
  
  useEffect(() => {
    if (window.location.pathname === '/register') {
      history.push('/register')
    } else {
      if (localStorage.access_token === 'undefined' || !localStorage.access_token) {
        history.push('/')
      } else {
        history.push('/game')
      }
    }
  }, [history])

  useEffect(() => {
    dispatch(setSocketConnect(io.connect("http://localhost:3001")))
  }, [dispatch])



  return (
    <div className="App">
      <Switch>
        <Route exact path='/game'>
          <World />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/buy-product' component={Booth} />
        <Route exact path='/both' component={Booth} />
      </Switch>
    </div>
  );
}

export default App;
