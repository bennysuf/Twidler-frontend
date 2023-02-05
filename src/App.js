import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login"
import Home from "./Home"
import AddUser from "./AddUser";

function App() {
  const [currentUser, setCurrentUser] = useState([]) //user logged in

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser}/>
          </Route> 
        <Route exact path="/login/new-user" component={AddUser}/>
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
