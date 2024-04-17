import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import LoginScreen from './screens/LoginScreen';
import MasterLayout from './layouts/MasterLayout';

function App() {
  return (
    <div className="App">
      
       <Router>
        <Switch>

           <Route path="/" exact component={LoginScreen} />
           <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props}/>} />
            

  </Switch>
      </Router>

    </div>
  );
}

export default App;
