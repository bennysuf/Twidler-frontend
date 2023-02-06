import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login"
import Home from "./Home"
import AddUser from "./AddUser";

function App() {
  const [currentUser, setCurrentUser] = useState([]) //user logged in //clears when page reloaded, how to fix
  const [userData, setUserData] = useState([]) //all users

  console.log("user", currentUser)

  useEffect(() => {
    fetch("http://localhost:9292/login")
      .then(r => r.json())
      .then(d => setUserData(d))
  }, [])

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} userData={userData} />
        </Route>
        <Route exact path="/login/new-user">
          <AddUser setCurrentUser={setCurrentUser} userData={userData} />
        </Route>
        <Route path="/home" component={Home} currentUser={currentUser}/>
      </Switch>
    </div>
  );
}

export default App;

//when logged out, sets currentUser to [], history.push("/login")
//delete posts only in self posts page

/* 
Need to work on:
CreatePost
CommentCards
self Post page


Already finises: 
PostCards
AddUser

*/
