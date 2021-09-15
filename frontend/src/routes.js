// Import settings 
import { Route, Switch } from "react-router-dom";

// Import pages 
import Login from './pages/Login/Login.js';
import Match from './pages/Match/Match.js';

const Routes = () => {
  return (
    <Switch>
      {/* Use <ProtectedRoute> for paths after login  */}
      <Route path="/match" component={Match} />
      <Route path="/" component={Login} />
    </Switch>
  )
}

export default Routes;
