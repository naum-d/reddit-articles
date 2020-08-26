import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

import FloatButton from '../components/FloatButton';
import ArticlesList from '../components/ArticlesList';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: theme.spacing(2),
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container direction="column" spacing={2} className={classes.grid}>
        <FloatButton name="frontend" label="Frontend" />
        <FloatButton name="reactjs" label="ReactJS" />
        <FloatButton name="vuejs" label="VueJS" />
        <FloatButton name="angular" label="Angular" />
      </Grid>

      <ArticlesList />
    </Fragment>
  );
};

export default MainPage;
