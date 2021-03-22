import './App.css';
import World from './components/world/index'
import Socket from './pages/Socket'
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
          <Route path='/chat' component={Socket} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
