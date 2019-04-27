import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Feature from "./components/private/Feature";
// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/feature" component={Feature} />
            {/* <Route path="/register" component={Register} />
            <Route path="/login" component={Login} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
