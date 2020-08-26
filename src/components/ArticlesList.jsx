import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as CONST from '../CONST';
import { appStoreUpdateStore } from '../store/appStore/actions';

const ArticlesList = () => {

  const dispatch = useDispatch();
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  const handleOpen = e => {
    e.preventDefault();
    e.stopPropagation();

    const { href: url } = e.target;

    window.open(url, '_blank');
  };

  const renderArticles = () => {
    return articles.map(({ id, like, data: { title, url } }) => (
      <div key={id}>
        <button onClick={e => handleLike(e, id)}>
          {!like && 'Like'}
          {like && 'Dislike'}
        </button>
        <button onClick={e => handleDelete(e, id)} children="Delete" />
        <a href={url} onClick={handleOpen} children={title} />
      </div>
    ));
  };

  return !!articles && (
    <div>
      {renderArticles()}
    </div>
  );
};

export default ArticlesList;
