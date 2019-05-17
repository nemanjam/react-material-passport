import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Private/Products";
import Product from "./views/Private/Product";
import Home from "./views/Home";
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
            <Route path="/products" component={Products} />
            <Route path="/product" component={Product} />
            <Route path="/feature" component={Feature} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
