import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Layout from "../layout/Layout";

const styles = theme => ({});

class Home extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Layout>
        {!isAuthenticated ? (
          <h1>Welcome! Log in or register!</h1>
        ) : (
          <h1>Welcome {user.displayName}!</h1>
        )}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(Home);
