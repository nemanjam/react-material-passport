import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import validate from "validate.js";
import _ from "lodash";

// Material icons
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";

import { registerUserWithEmail } from "../../actions/authActions";

// Component styles
import styles from "./styles";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField label={label} error={touched && error} {...input} {...custom} />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onChange={input.onChange}
  />
);

class Register extends Component {
  handleFieldChange = () => {};

  onSubmit = formProps => {
    console.log(formProps);
    this.props.registerUserWithEmail(formProps, () => {
      this.props.history.push("/login");
    });
  };

  render() {
    const { classes, handleSubmit } = this.props;
    const values = {};
    const errors = {};
    const isLoading = false;
    const isValid = true;
    const submitError = false;
    const showFirstNameError = false;
    const showLastNameError = false;
    const showEmailError = false;
    const showPasswordError = false;
    const showPolicyError = false;

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
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Use your work email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    {/* <TextField
                      className={classes.textField}
                      label="First name"
                      name="firstName"
                      onChange={event =>
                        this.handleFieldChange("firstName", event.target.value)
                      }
                      value={values.firstName}
                      variant="outlined"
                    /> */}
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="firstName"
                      component={renderTextField}
                      label="First Name"
                    />
                    {showFirstNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.firstName[0]}
                      </Typography>
                    )}
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="lastName"
                      component={renderTextField}
                      label="Last Name"
                    />
                    {showLastNameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.lastName[0]}
                      </Typography>
                    )}
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
                    <div className={classes.policy}>
                      <Field
                        className={classes.policyCheckbox}
                        name="policy"
                        color="primary"
                        component={renderCheckbox}
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1"
                      >
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {errors.policy[0]}
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
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignUp}
                      size="large"
                      variant="contained"
                      type="submit"
                    >
                      Sign up now
                    </Button>
                  )}
                  <Typography className={classes.signIn} variant="body1">
                    Have an account?{" "}
                    <Link className={classes.signInUrl} to="/login">
                      Log In
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

Register.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  connect(
    null,
    registerUserWithEmail
  ),
  reduxForm({ form: "Login" }),
  withStyles(styles)
)(Register);
