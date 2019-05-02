import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Feature from './components/private/Feature';
import Products from './components/private/Products';


import './App.css';

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
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <main className={classes.layout}>
            <Switch>            
              <Route exact path="/" component={Home} />
              <Route path="/products" component={Products} />
              <Route path="/feature" component={Feature} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
