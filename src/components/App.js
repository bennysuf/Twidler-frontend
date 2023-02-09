import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login"
import Home from "./Home"
import AddUser from "./AddUser";
import UsersPosts from "./UsersPosts";

function App() {
  const [currentUser, setCurrentUser] = useState({ username: "Loading.." }) //user logged in
  const [userData, setUserData] = useState([]) //all users
  const [reload, setReload] = useState("")

  const history = useHistory()

  useEffect(() => { // pulls current user and adds it to state
    fetch("http://localhost:9292/current-user")
      .then(r => r.json())
      .then(d => {
        setCurrentUser(d[0])
      })
  }, [reload])
  
  useEffect(() => { // pulls all users 
    fetch("http://localhost:9292/login")
      .then(r => r.json())
      .then(d => setUserData(d))
  }, [])

  function userUpdate(user) { // updates user thats logged in
    fetch(`http://localhost:9292/current-user/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          user_id: user.id
        }
      ),
    })
      .then(r => r.json())
      .then(d => setReload(d))
  }


  function handleLogout() {
    console.log("delete")
    fetch("http://localhost:9292/current-user", {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(d => {
        history.push("/login")
        setCurrentUser({ username: "Loading.." })
      })
  }

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route exact path="/login/new-user">
          <AddUser setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route path="/home">
          <Home currentUser={currentUser} handleLogout={handleLogout} />
        </Route>
        <Route path="/profile">
          <UsersPosts currentUser={currentUser} handleLogout={handleLogout} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;


//delete posts only in self posts page

/* 
TODO:
move send button down
edit and delete post button

*/
