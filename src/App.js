import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./login"

function App() {
  const [data, setData] = useState([])

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
