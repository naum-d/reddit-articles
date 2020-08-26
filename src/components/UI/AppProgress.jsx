import React from 'react';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: fade(theme.palette.background.default, 0.7),
    zIndex: 1000,
  },
}));

const AppProgress = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item children={<CircularProgress color="secondary" />} />
    </Grid>
  );
};

AppProgress.propTypes = {};

export default AppProgress;
