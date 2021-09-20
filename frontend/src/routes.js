// Import settings 
import { Route, Switch } from "react-router-dom";

// Import pages 
import Login from './pages/Login/Login.js';
import FindFriends from './pages/FindFriends/FindFriends.js';

const Routes = () => {
  return (
    <Switch>
      {/* Use <ProtectedRoute> for paths after login  */}
      <Route path="/findfriends" component={FindFriends} />
      <Route path="/" component={Login} />
    </Switch>
  )
}

export default Routes;
