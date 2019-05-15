import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logInUser, logOutUser } from "../../actions/authActions";
import { ReactComponent as FbSvg } from "../../assets/icons/facebook-original.svg";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
    marginLeft: theme.spacing.unit,
    //border: '1px solid white',
    width: "20px",
    height: "20px"
    //borderRadius: 4,
    //background: 'white'
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
            <Typography
              variant="title"
              noWrap
              color="inherit"
              style={{ marginRight: "20px" }}
            >
              React Material Passport
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/feature">
              Feature
            </Button>
            <section className={classes.toolbarButtons}>
              {this.props.auth.isAuthenticated ? (
                <Button
                  variant="outlined"
                  className={classes.noWrap}
                  color="inherit"
                  onClick={this.onLogOut}
                >
                  Log out {this.props.auth.user.displayName}
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    variant="outlined"
                    className={classes.noWrap}
                    color="inherit"
                    href="https://localhost:5000/auth/facebook"
                  >
                    Login with
                    <FbSvg className={classes.rightIcon} />
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.noWrap}
                    color="inherit"
                    href="https://localhost:5000/auth/google"
                  >
                    Login with Google
                  </Button>
                </React.Fragment>
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
  connect(
    mapStateToProps,
    { logInUser, logOutUser }
  ),
  withStyles(styles)
)(Navbar);
