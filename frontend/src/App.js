import { BrowserRouter, Route} from 'react-router-dom'

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';


function App() {
  return (
    <div className="App">
      
       <BrowserRouter>

           <Route path="/" exact component={LoginScreen} />
           <Route path="/admin/dashboard" exact component={DashboardScreen} />

  
      </BrowserRouter>

    </div>
  );
}

export default App;
