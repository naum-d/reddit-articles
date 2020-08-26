import React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import * as CONST from '../CONST';
import { getUniqueKey, mathRandom } from '../helpers';
import { appStoreMakeRequest } from '../store/appStore/actions';

const FloatButton = props => {
  const { label, name } = props;

  const dispatch = useDispatch();

  const mapper = (newData, oldData) => {
    let article = { id: getUniqueKey(), like: false, ...(newData[mathRandom(0, newData.length)]) };
    return [article, ...(oldData || [])];
  };

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(appStoreMakeRequest({ storeName: CONST.ARTICLES_STORE, dataSource: CONST.ARTICLES(name), mapper }));
  };

  return (
    <div>
      <button onClick={handleClick} children={label} />
    </div>
  );
};

FloatButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FloatButton;
