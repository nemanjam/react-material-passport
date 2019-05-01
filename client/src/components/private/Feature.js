import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getFeature } from '../../actions/featureActions';
import ProductCard from './ProductCard';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Feature extends Component {

    componentDidMount() {
        this.props.getFeature();
        // console.log(this.props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    {this.props.message}
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                </Typography>
                <ProductCard />
            </Paper>
            </div>
        );
    }   
}

Feature.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    message: state.feature.message,
    errors: state.errors
  });
  
  export default compose(
    connect(mapStateToProps, { getFeature }),
    withStyles(styles)
  )(Feature);
