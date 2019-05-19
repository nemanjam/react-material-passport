import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import IconButton from "@material-ui/core/IconButton";

import { getFeature } from "../../actions/featureActions";
import { Paper, Button } from "@material-ui/core";

import Layouts from "../../layouts/index";

const styles = theme => ({
  root: {
    marginTop: "15px"
  },
  image: {
    maxWidth: "100%"
  },
  paper: {
    padding: theme.spacing(2)
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 32
  },
  button: {
    marginTop: theme.spacing(1)
  }
});

class Product extends Component {
  componentDidMount() {
    // this.props.getFeature();
    // console.log(this.props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Layouts>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <img className={classes.image} src="static/images/product.png" />
            </Grid>
            <Grid container spacing={2} item xs={12} sm={6} direction="column">
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom>
                    Rere Wardrobe : Husna Outer CSR1
                  </Typography>
                  <Typography variant="h5" color="secondary" gutterBottom>
                    IDR 275,000
                  </Typography>

                  <Grid container justify="flex-start" alignItems="center">
                    <Grid item>
                      <IconButton>
                        <FavoriteBorderOutlined
                          color="secondary"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" gutterBottom>
                        Add to Wishlist
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Add to cart
                  </Button>
                  <Button
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    Buy now
                  </Button>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography variant="caption" gutterBottom>
                    Product details
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    About Product
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Rere Wardrobe : Husna Outer CSR from Promo CSR . the latest
                    muslim Cardigan collection with comfortable material to wear
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Materials
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Lacoteli mos crepe brokat
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Note
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    There may be slight differences in color between the images
                    with the original colors , depending on the resolution of
                    your monitor
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layouts>
    );
  }
}

Product.propTypes = {
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
)(Product);
