import { useEffect } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./pages/login";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Notify from "./components/notify/Notify";
import { useSelector, useDispatch } from "react-redux"
import { refreshToken } from "./redux/actions/authAction"


function App() {

  const { auth} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [])


  return (
    <Router>
      <Notify />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:id" component={PageRender} />

        </div>
      </div>
    </Router>
  );
}

export default App;
