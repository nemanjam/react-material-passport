import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { getFeature } from "../../actions/privateActions";
import Layout from "../../layout/Layout";
import requireAuth from "../../components/requireAuth";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: "15px"
  }
});

class Feature extends Component {
  componentDidMount() {
    this.props.getFeature();
    // console.log(this.props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <div>
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" component="h3">
              {this.props.message}
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </div>
      </Layout>
    );
  }
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.private.message,
  errors: state.errors
});

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    { getFeature }
  ),
  withStyles(styles)
)(Feature);
