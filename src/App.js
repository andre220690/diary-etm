import React from "react";
import StartPage from "./components/StartPage/StartPage";
import Gantt from "./components/GanttPage/Gantt";
import Kanban from "./components/Kanban/Kanban";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <StartPage/>
          </Route>
          <Route path="/gantt">
            <Gantt/>
          </Route>
          <Route path="/kanban">
            <Kanban/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
