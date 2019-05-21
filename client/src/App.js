import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Profile from "./views/Private/Profile";
import Feature from "./views/Private/Feature";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/feature" component={Feature} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
