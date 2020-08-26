import React, { useState } from 'react';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import * as CONST from '../CONST';
import { getUniqueKey, mathRandom } from '../helpers';
import { appStoreMakeRequest } from '../store/appStore/actions';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    animation: `$containerMove 20000ms infinite`,
  },
  button: {
    animation: `$buttonMove 20000ms infinite`,
  },
  pause: {
    animationPlayState: 'paused',
  },

  '@keyframes containerMove': {
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },

  '@keyframes buttonMove': {
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
}));

const FloatButton = props => {
  const { label, name } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  const mapper = (newData, oldData) => {
    let article = { id: getUniqueKey(), like: false, ...newData[mathRandom(0, newData.length - 1)] };
    return [article, ...(oldData || [])];
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(appStoreMakeRequest({ storeName: CONST.ARTICLES_STORE, dataSource: CONST.ARTICLES(name), mapper }));
  };

  const handleEnter = () => {
    setIsHover(true);
  };

  const handleLeave = () => {
    setIsHover(false);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <div className={clsx(classes.container, { [classes.pause]: isHover })}>
        <Button
          color="primary"
          variant="contained"
          className={clsx(classes.button, { [classes.pause]: isHover })}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          children={label}
        />
      </div>
    </Grid>
  );
};

FloatButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FloatButton;
