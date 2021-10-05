import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask.js";
import EditTask from "./pages/EditTask.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addTask" component={AddTask} />
        <Route exact path="/editTask/:id" component={EditTask} />
      </Switch>
    </div>
  );
}
export default App;
