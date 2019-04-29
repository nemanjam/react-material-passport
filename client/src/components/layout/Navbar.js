import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logInUser, logOutUser } from '../../actions/authActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  fullHeight: {
    ...theme.mixins.toolbar,
    minWidth: 20
  },
  toolbarButtons: {
    marginLeft: 'auto',
  }
});


class Navbar extends Component {
  
  onLogOut = () => {
    this.props.logOutUser();
	};

  componentDidMount() {
    if (window.location.hash === "#_=_") window.location.hash = "";
    this.props.logInUser();
    // console.log('store: ', this.props.auth);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar>   
          <Toolbar>

            <Typography variant="title" color="inherit">
              React Material Passport
            </Typography>

            <Tabs value={0} classes={{ root: classes.fullHeight }} onChange={this.handleChange}>
              <Tab classes={{ root: classes.fullHeight }} label="Home" component={Link} to="/" />
              <Tab classes={{ root: classes.fullHeight }} label="Feature" component={Link} to="/feature"/>
              <Tab classes={{ root: classes.fullHeight }} label="Item Three" />
            </Tabs>
            <section className={classes.toolbarButtons}>
            {this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <Typography color="inherit">
                  Welcome {this.props.auth.user.displayName}
                </Typography>
                <Button color="inherit" onClick={this.onLogOut} >Log out</Button>
              </React.Fragment>
            ) : (
              <Button color="inherit" href="https://localhost:5000/auth/facebook">Login with Facebook</Button>
            )}
          </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  connect(mapStateToProps, { logInUser, logOutUser }),
  withStyles(styles)
)(Navbar);

