import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    );
  }
}
