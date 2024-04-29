import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import MasterLayout from './layouts/MasterLayout';
import { useSelector } from 'react-redux';

const App = () => {
  const { currentUser } = useSelector((state) => state.loginUserReducer);
  const isAuthenticated = !!currentUser;

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public route accessible to all users */}
          <Route path="/" exact component={LoginScreen} />

          {/* Protected route accessible only if user is authenticated */}
          <PrivateRoute path="/admin" component={MasterLayout} isAuthenticated={isAuthenticated} />

          {/* Redirect all other undefined paths to the login screen */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};

// PrivateRoute component for protecting routes based on authentication
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default App;
