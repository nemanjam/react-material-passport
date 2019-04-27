import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  
  componentDidMount() {
    const cookieJwt = Cookies.get('x-auth-cookie');
    // console.log('cookie: ', cookieJwt);
    this.props.loginUser(cookieJwt);
    console.log('state: ', this.props.auth);
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
            <Button color="inherit" href="https://localhost:5000/auth/facebook">Login with Facebook</Button>
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
  connect(mapStateToProps, { loginUser }),
  withStyles(styles)
)(Navbar);

