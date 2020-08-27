import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import * as CONST from '../CONST';
import AppProgress from './UI/AppProgress';
import { appStoreCreateStore, appStoreDeleteStore, appStoreUpdateStore } from '../store/appStore/actions';

const HISTORY = {
  past: [],
  current: null,
  future: [],
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: theme.spacing(9),
  },
  group: {
    padding: theme.spacing(0, 2),
  },
}));

const ArticlesList = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [history, setHistory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const historyStore = useSelector(state => state.appStore[CONST.HISTORY_STORE]);
  const articleStore = useSelector(state => state.appStore[CONST.ARTICLES_STORE]);

  useEffect(() => {
    dispatch(appStoreCreateStore({ storeName: CONST.HISTORY_STORE, data: { data: HISTORY } }));
    dispatch(appStoreCreateStore({ storeName: CONST.ARTICLES_STORE, data: { data: [], isLoading: false } }));

    return () => {
      dispatch(appStoreDeleteStore(CONST.HISTORY_STORE));
      dispatch(appStoreDeleteStore(CONST.ARTICLES_STORE));
    };
  }, [dispatch]);

  useEffect(() => {
    !!articleStore && setIsLoading(articleStore.isLoading);

    if (!!articleStore && !articleStore.isLoading) {
      const { data } = articleStore;
      const mapper = (newData, oldData) => ({
        past: [...oldData['past'], oldData['current']].filter(i => !!i),
        current: newData,
        future: [],
      });

      dispatch(appStoreUpdateStore({ storeName: CONST.HISTORY_STORE, data: { data }, mapper }));
    }
  }, [articleStore, dispatch]);

  useEffect(() => {
    !!historyStore && !!historyStore.data['current'] && setHistory(historyStore.data);
  }, [historyStore]);

  const handleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const data = history['current'];
    const mapper = newData => [...newData.map(i => i.id === id ? { ...i, like: !i.like } : i)];

    dispatch(appStoreUpdateStore({ storeName: CONST.ARTICLES_STORE, data: { data }, mapper }));
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const data = history['current'];
    const mapper = newData => [...newData.filter(i => i.id !== id)];

    dispatch(appStoreUpdateStore({ storeName: CONST.ARTICLES_STORE, data: { data }, mapper }));
  };

  const handleOpen = (e, url) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(url, '_blank');
  };

  const handleUndo = () => {
    const mapper = (newData, oldData) => ({
      past: [...oldData['past'].slice(0, -1)],
      current: oldData['past'].slice(-1)[0],
      future: [oldData['current'], ...oldData['future']],
    });
    dispatch(appStoreUpdateStore({ storeName: CONST.HISTORY_STORE, mapper }));
  };

  const handleRedo = () => {
    const mapper = (newData, oldData) => ({
      past: [...oldData['past'], oldData['current']],
      current: oldData['future'][0],
      future: [...oldData['future'].slice(1)],
    });
    dispatch(appStoreUpdateStore({ storeName: CONST.HISTORY_STORE, mapper }));
  };

  const renderArticles = () => {
    return history['current'].map(({ id, like, data: { title, url, author } }) => (
      <ListItem key={id} button onClick={e => handleOpen(e, url)}>
        <ListItemAvatar children={<Avatar children={<DescriptionOutlinedIcon />} />} />

        <ListItemText primary={title} secondary={author} />

        <ListItemSecondaryAction>
          <IconButton edge="start" color="secondary" onClick={e => handleLike(e, id)}>
            {!like && <FavoriteBorderOutlinedIcon />}
            {like && <FavoriteOutlinedIcon />}
          </IconButton>

          <IconButton edge="end" onClick={e => handleDelete(e, id)} children={<DeleteOutlinedIcon />} />
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  return !!history && (
    <Grid container spacing={2} direction="column" className={classes.root}>
      {isLoading && <AppProgress />}

      <Grid item>
        <ButtonGroup variant="outlined" color="primary" className={classes.group}>
          <Button disabled={!history['past'].length} onClick={handleUndo} children="Undo" />
          <Button disabled={!history['future'].length} onClick={handleRedo} children="Redo" />
        </ButtonGroup>
      </Grid>

      <Grid item>
        <List component="nav">
          {renderArticles()}
        </List>
      </Grid>
    </Grid>
  );
};

export default ArticlesList;
