import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector, getFormMeta } from "redux-form";
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

import { registerUserWithEmail } from "../actions/authActions";

const styles = theme => ({
  root: {
    height: "100vh"
  },
  grid: {
    height: "100%"
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.common.white
  },
  bio: {
    color: theme.palette.common.white
  },
  contentWrapper: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  backButton: {},
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    paddingLeft: "100px",
    paddingRight: "100px",
    paddingBottom: "125px",
    flexBasis: "700px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5)
  },
  fields: {
    marginTop: theme.spacing(5)
  },
  textField: {
    width: "100%",
    "& + & ": {
      marginTop: theme.spacing(2)
    }
  },
  policy: {
    display: "flex",
    alignItems: "center"
  },
  policyCheckbox: {
    marginLeft: "-10px"
  },
  policyText: {
    display: "inline",
    color: theme.palette.text.secondary
  },
  policyUrl: {
    color: theme.palette.text.primary,
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.primary.main
    }
  },
  progress: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  signUpButton: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  signIn: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signInUrl: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  fieldError: {
    color: "red",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  submitError: {
    color: "red",
    alignText: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Fragment>
    <TextField
      label={label}
      error={touched && !!error}
      {...input}
      {...custom}
    />
    {touched && error && (
      <Typography className={custom.errorclass} variant="body2">
        {error}
      </Typography>
    )}
  </Fragment>
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onChange={input.onChange}
  />
);

class Register extends Component {
  state = { isLoading: false };

  onSubmit = formProps => {
    this.setState({ isLoading: true });
    this.props.registerUserWithEmail(
      formProps,
      () => {
        this.props.history.push("/login");
      },
      () => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    const {
      classes,
      errors,
      handleSubmit,
      pristine,
      invalid,
      submitting,
      form,
      policy,
      meta
    } = this.props;

    const { isLoading } = this.state;
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
                  onSubmit={handleSubmit(this.onSubmit.bind(this))}
                  className={classes.form}
                >
                  <Typography className={classes.title} variant="h4">
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Use your work email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="firstName"
                      component={renderTextField}
                      label="First Name"
                      errorclass={classes.fieldError}
                    />
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="lastName"
                      component={renderTextField}
                      label="Last Name"
                      errorclass={classes.fieldError}
                    />
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="email"
                      component={renderTextField}
                      label="Email address"
                      errorclass={classes.fieldError}
                    />
                    <Field
                      className={classes.textField}
                      variant="outlined"
                      name="password"
                      component={renderTextField}
                      label="Password"
                      type="password"
                      errorclass={classes.fieldError}
                    />
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
                    {meta["policy"] && meta["policy"]["touched"] && !policy && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {"You must agree to the policy"}
                      </Typography>
                    )}
                  </div>
                  {errors && typeof errors !== "object" && (
                    <Typography className={classes.submitError} variant="body2">
                      {errors.toString()}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={invalid || submitting || pristine}
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

const selector = formValueSelector("Register");

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  policy: selector(state, "policy"),
  meta: getFormMeta("Register")(state)
});

const validate = values => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Field is required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { registerUserWithEmail }
  ),
  reduxForm({ form: "Register", validate, touchOnChange: true }),
  withStyles(styles)
)(Register);
