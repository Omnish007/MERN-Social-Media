import { BrowserRouter as Router, Route } from "react-router-dom"
// import Register  from "./pages/register";
// import Login  from "./pages/login";
import PageRender from "./PageRender";

function App() {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route path="/:page" component={PageRender} />
          <Route path="/:page/:id" component={PageRender} />

        </div>
      </div>
    </Router>
  );
}

export default App;
