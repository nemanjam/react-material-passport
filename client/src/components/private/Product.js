import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';

import { getFeature } from '../../actions/featureActions';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    image: {
        maxWidth: '100%'
    },
    paper: {
        padding: theme.spacing.unit * 2
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32
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
            <div>           
            <Grid container spacing={24}>
                <Grid item  sm={12} md={6}>
                    <img className={classes.image} src="static/images/product.png" />
                </Grid>                       
                <Grid container spacing={8} item sm={12} md={6} direction="column" >
                    <Grid item >
                        <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>
                            Rere Wardrobe : Husna Outer CSR
                        </Typography>                        
                        <Typography variant="h5" color="secondary" gutterBottom>
                            IDR 275,000
                        </Typography>

                            <Grid container justify="flex-start" alignItems="center">
                                <Grid item>
                                    <IconButton>
                                        <FavoriteBorderOutlined color="secondary" className={classes.icon} />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption" gutterBottom>
                                        Add to Wishlist
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper> 
                    </Grid> 
                    <Grid item> 
                        <Paper>
                            123
                        </Paper>  
                    </Grid>    
                </Grid>             
            </Grid>             
            </div>
        );
    }   
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    message: state.feature.message,
    errors: state.errors
  });
  
  export default compose(
    connect(mapStateToProps, { getFeature }),
    withStyles(styles)
  )(Product);
