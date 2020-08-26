import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import * as CONST from '../CONST';
import AppProgress from './UI/AppProgress';
import { appStoreUpdateStore } from '../store/appStore/actions';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: theme.spacing(9),
  },
}));

const ArticlesList = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const articleStore = useSelector(state => state.appStore[CONST.ARTICLES_STORE]);

  useEffect(() => {
    !!articleStore && setIsLoading(articleStore.isLoading);
    !!articleStore && !articleStore.isLoading && setArticles(articleStore.data);

  }, [articleStore]);

  const handleLike = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const mapper = (newData, oldData) => [...oldData.map(i => i.id === id ? { ...i, like: !i.like } : i)];

    dispatch(appStoreUpdateStore({ storeName: CONST.ARTICLES_STORE, mapper }));
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const mapper = (newData, oldData) => [...oldData.filter(i => i.id !== id)];

    dispatch(appStoreUpdateStore({ storeName: CONST.ARTICLES_STORE, mapper }));
  };

  const handleOpen = (e, url) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(url, '_blank');
  };

  const renderArticles = () => {
    return articles.map(({ id, like, data: { title, url, author } }) => (
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

  return (
    <Grid container className={classes.root}>
      {isLoading && <AppProgress />}
      <Grid item xs={12}>
        <List component="nav">
          {!!articles && renderArticles()}
        </List>
      </Grid>
    </Grid>
  );
};

export default ArticlesList;
