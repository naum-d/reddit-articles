export const APP_STORE_CREATE_STORE = 'APP_STORE_CREATE_STORE';
export const APP_STORE_UPDATE_STORE = 'APP_STORE_UPDATE_STORE';
export const APP_STORE_DELETE_STORE = 'APP_STORE_DELETE_STORE';
export const APP_STORE_MAKE_REQUEST = 'APP_STORE_MAKE_REQUEST';

export const appStoreCreateStore = ({ storeName, data = {} }) => {
  return {
    type: APP_STORE_CREATE_STORE,
    payload: { storeName, data },
  };
};

export const appStoreUpdateStore = ({ storeName, data = {}, mapper }) => {
  return {
    type: APP_STORE_UPDATE_STORE,
    payload: { storeName, data, mapper },
  };
};

export const appStoreDeleteStore = storeName => {
  return {
    type: APP_STORE_DELETE_STORE,
    payload: { storeName },
  };
};

export const appStoreMakeRequest = params => {
  return {
    type: APP_STORE_MAKE_REQUEST,
    payload: { ...params },
  };
};
