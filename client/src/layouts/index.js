import React, { Component, Fragment } from "react";
import { Navbar } from "./components";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1140 + theme.spacing.unit * 3 * 2)]: {
      width: 1140,
      marginLeft: "auto",
      marginRight: "auto"
    },
    paddingTop: "64px"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function Layouts(props) {
  const { classes } = props;
  return (
    <Fragment>
      <Navbar />
      <div className={classes.root}>{props.children}</div>
    </Fragment>
  );
}

Layouts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layouts);
