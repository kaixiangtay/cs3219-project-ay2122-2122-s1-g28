import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

//CSS
import './global.css';

function App(props) {
  return (
    <BrowserRouter> 
      <Routes />
    </BrowserRouter> 
  );
}

export default App;
