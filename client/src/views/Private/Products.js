import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import { getFeature } from "../../actions/featureActions";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import Layouts from "../../layouts/index";

const styles = theme => ({
  root: {
    marginTop: "15px"
  }
});

class Products extends Component {
  componentDidMount() {
    // this.props.getFeature();
    // console.log(this.props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layouts>
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justify="space-around"
          >
            <Grid
              container
              item
              xs={12}
              sm={4}
              md={3}
              spacing={2}
              alignItems="stretch"
              direction="column"
            >
              <Grid item>
                <ProductList />
              </Grid>
              <Grid item>
                <ProductList />
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={2}
              xs={12}
              sm={8}
              md={9}
              alignItems="flex-end"
            >
              {_.range(10).map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <ProductCard />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      </Layouts>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.feature.message,
  errors: state.errors
});

export default compose(
  connect(
    mapStateToProps,
    { getFeature }
  ),
  withStyles(styles)
)(Products);
