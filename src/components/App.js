import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login"
import Home from "./Home"
import AddUser from "./AddUser";
import NavBar from "./NavBar";
import UsersPosts from "./UsersPosts";

function App() {
  const [currentUser, setCurrentUser] = useState({ username: "Loading.." }) //user logged in
  const [userData, setUserData] = useState([]) //all users
  
// console.log(currentUser)

  useEffect(() => {
    fetch("http://localhost:9292/login")
      .then(r => r.json())
      .then(d => setUserData(d))
  }, [])

  function userUpdate(user) { //updates current user and pulls it
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
  }

  useEffect(() => {
    fetch("http://localhost:9292/current-user")
      .then(r => r.json())
      .then(d => {
        setCurrentUser(d[0])
      })
  }, [])

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route exact path="/login/new-user">
          <AddUser setCurrentUser={setCurrentUser} userData={userData} userUpdate={userUpdate} />
        </Route>
        <Route path="/home">
          <Home currentUser={currentUser} />
        </Route>
        <Route path="/profile">
          <UsersPosts currentUser={currentUser}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;



//when logged out, sets currentUser to [], history.push("/login"), delete user from CurrentUser
//delete posts only in self posts page

// current user should update after login and log out 

/* 
Need to work on:
[] CreatePost
[] CommentCards
[] self Post page


Already finises: 
PostCards
AddUser

*/
