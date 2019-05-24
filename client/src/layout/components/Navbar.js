import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logInUser, logOutUser } from "../../actions/authActions";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    marginLeft: 20
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  noWrap: {
    whiteSpace: "nowrap"
  },
  toolbarButtons: {
    marginLeft: "auto"
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    //border: '1px solid white',
    width: "20px",
    height: "20px"
    //borderRadius: 4,
    //background: 'white'
  }
});

class Navbar extends Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogOut = () => {
    this.props.logOutUser(() => {
      this.props.history.push("/");
    });
  };

  componentDidMount() {
    if (window.location.hash === "#_=_") window.location.hash = "";
    this.props.logInUser();
    // console.log('store: ', this.props.auth);
  }

  render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              color="inherit"
              style={{ marginRight: "20px" }}
            >
              Mern
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {auth.isAuthenticated && (
              <Button color="inherit" component={Link} to="/feature">
                Feature
              </Button>
            )}
            <section className={classes.toolbarButtons}>
              {auth.isAuthenticated ? (
                <div>
                  <IconButton
                    aria-owns={Boolean(anchorEl) ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem component={Link} to="/profile">
                      <IconButton color="inherit">
                        <AccountCircle />
                      </IconButton>
                      <p>Profile</p>
                    </MenuItem>
                    <MenuItem onClick={this.onLogOut}>
                      <IconButton color="inherit">
                        <ExitToApp />
                      </IconButton>
                      <p>Log out</p>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  className={classes.noWrap}
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              )}
            </section>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { logInUser, logOutUser }
  ),
  withStyles(styles)
)(Navbar);
