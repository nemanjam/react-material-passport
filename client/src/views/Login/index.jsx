import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";

// Material icons
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography,
  IconButton
} from "@material-ui/core";

// Shared components
import { Facebook as FacebookIcon, Google as GoogleIcon } from "../../icons";

// Component styles
import styles from "./styles";

import { loginUserWithEmail } from "../../actions/authActions";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField label={label} error={touched && error} {...input} {...custom} />
);

class Login extends Component {
  onSubmit = formProps => {
    console.log(formProps);
    this.props.loginUserWithEmail(formProps, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const { classes, handleSubmit } = this.props;

    const showEmailError = false;
    const showPasswordError = false;
    const errors = {};
    const isLoading = false;
    const isValid = true;
    const submitError = false;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container justify="center">
          <Grid className={classes.content} item xs={6}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  component={Link}
                  to="/"
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                  onSubmit={handleSubmit(this.onSubmit)}
                  className={classes.form}
                >
                  <Typography className={classes.title} variant="h4">
                    Log in
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Log in with social media
                  </Typography>
                  <Button
                    className={classes.facebookButton}
                    color="primary"
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    <FacebookIcon className={classes.facebookIcon} />
                    Login with Facebook
                  </Button>
                  <Button
                    className={classes.googleButton}
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    <GoogleIcon className={classes.googleIcon} />
                    Login with Google
                  </Button>
                  <Typography className={classes.sugestion} variant="body1">
                    or login with email address
                  </Typography>
                  <div className={classes.fields}>
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="email"
                      component={renderTextField}
                      label="Email address"
                    />
                    {showEmailError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.email[0]}
                      </Typography>
                    )}
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="password"
                      component={renderTextField}
                      label="Password"
                      type="password"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Log in now
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    Don't have an account?{" "}
                    <Link className={classes.signUpUrl} to="/register">
                      Register
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  connect(
    null,
    { loginUserWithEmail }
  ),
  reduxForm({ form: "Login" }),
  withStyles(styles)
)(Login);
