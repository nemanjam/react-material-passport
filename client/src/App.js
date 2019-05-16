import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import "./App.css";
import Layouts from "./layouts";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Private/Products";
import Home from "./views/Home";
import Feature from "./views/Private/Feature";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1140 + theme.spacing.unit * 3 * 2)]: {
      width: 1140,
      marginLeft: "auto",
      marginRight: "auto"
    },
    paddingTop: "64px"
  },
  paper1: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/products" component={Products} />
            <Route path="/feature" component={Feature} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
