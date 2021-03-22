import './App.css';
import World from './components/world/index'
import Booth from './components/Booth'
// import Socket from './pages/Socket'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
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
          <Route exact path='/' component={World} />
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
