// Import settings 
import { Route, Redirect, Switch } from "react-router-dom";

// Import pages 
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';
import Profile from'./pages/Profile/Profile.js';
import FindFriends from './pages/FindFriends/FindFriends.js';

const Routes = () => {
  return (
    <Switch>
      {/* Use <ProtectedRoute> for paths after login  */}
      <Route
        exact
        path="/"
        render={() => {
          return (
            <Redirect to="/login" /> 
          )
        }}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/findfriends" component={FindFriends} />
    </Switch>
  )
}

export default Routes;
