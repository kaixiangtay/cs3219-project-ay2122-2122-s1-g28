import { BrowserRouter } from "react-router-dom";
import Routes from "./routes"

function App(props) {
  return (
    <BrowserRouter> 
      <Routes />
    </BrowserRouter> 
  );
}

export default App;
