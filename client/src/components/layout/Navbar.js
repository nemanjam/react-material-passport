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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
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
};

class Navbar extends Component {
  
  onLogOut = () => {
    this.props.logOutUser();
	};

  componentDidMount() {
    this.props.logInUser();
    // console.log('store: ', this.props.auth);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Mern
            </Typography>
            <List component="nav">
              <ListItem component="div">
                <ListItemText inset>
                  <Typography color="inherit" variant="title">
                  <Link to="/">Home</Link>
                  </Typography>
                </ListItemText>
              </ListItem >
            </List>
            { this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <List component="nav">
                  <ListItem component="div">
                      <ListItemText inset>
                        <Typography color="inherit" variant="title">
                        <Link to="/feature">Feature</Link>
                        </Typography>
                      </ListItemText>
                  </ListItem >
                </List>

                <Typography color="inherit">
                  Welcome {this.props.auth.user.displayName}
                </Typography>
                <Button color="inherit" onClick={this.onLogOut} >Log out</Button>
              </React.Fragment>
            ) : (
              <Button color="inherit" href="https://localhost:5000/auth/facebook">Login with Facebook</Button>
            )}
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

