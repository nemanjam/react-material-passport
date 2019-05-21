import React, { Component, Fragment } from "react";
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
import FacebookIcon from "../icons/Facebook";
import GoogleIcon from "../icons/Google";

import { loginUserWithEmail } from "../actions/authActions";

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
    //marginTop: theme.spacing.unit * 3
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5)
  },
  facebookButton: {
    marginTop: theme.spacing(3),
    width: "100%"
  },
  facebookIcon: {
    marginRight: theme.spacing(1)
  },
  googleButton: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  googleIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    textAlign: "center"
  },
  fields: {
    marginTop: theme.spacing(2)
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
    marginLeft: "-14px"
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
  signInButton: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  signUp: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  signUpUrl: {
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
    <TextField label={label} error={touched && error} {...input} {...custom} />
    {touched && error && (
      <Typography className={custom.errorclass} variant="body2">
        {error}
      </Typography>
    )}
  </Fragment>
);

class Login extends Component {
  state = { isLoading: false };

  onSubmit = formProps => {
    console.log(this);
    this.setState({ isLoading: true });
    this.props.loginUserWithEmail(
      formProps,
      () => {
        this.props.history.push("/");
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
      submitting
    } = this.props;

    const { isLoading } = this.state;

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
                    Log in
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Log in with social media
                  </Typography>
                  <Button
                    className={classes.facebookButton}
                    color="primary"
                    href="https://localhost:5000/auth/facebook"
                    size="large"
                    variant="contained"
                  >
                    <FacebookIcon className={classes.facebookIcon} />
                    Login with Facebook
                  </Button>
                  <Button
                    className={classes.googleButton}
                    href="https://localhost:5000/auth/google"
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
                      className={classes.signInButton}
                      color="primary"
                      disabled={invalid || submitting || pristine}
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

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { loginUserWithEmail }
  ),
  reduxForm({ form: "Login", validate }),
  withStyles(styles)
)(Login);
