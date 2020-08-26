import axios from 'axios';

const AppAPI = () => {
  const request = (url, extra = {}) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    extra.headers = extra.headers || {};

    return new Promise((resolve, reject) => {
      axios({
        url,

        ...extra,
        headers: { ...headers, ...extra.headers },
        timeout: 50 * 1000,
      })
        .then(resp => {
          !!resp.data.errors ? reject(resp.data.errors) : resolve(resp.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return {
    request,
  };
};

export default AppAPI();
