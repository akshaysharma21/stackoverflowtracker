import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom"
//import all the components you built to use with the app
import Navbar from "./components/navbar.component.js";
import SearchTags from "./components/enter-tag.component";
import WelcomePage from "./components/welcome-page.component";
import Information from "./components/information.component"

//add the components to the router
function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" component={WelcomePage}/>
      <Route path="/searchTags" component={SearchTags}/>
      <Route path="/information" component={Information}/>
    </Router>  
  );
}

export default App;
