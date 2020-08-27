import axios from 'axios';

const AppAPI = () => {
  const request = async (url, extra = {}) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    extra.headers = extra.headers || {};

    const storage = localStorage.getItem(url);

    if (!!storage && JSON.parse(storage)['timer'] > new Date().getTime()) {
      return JSON.parse(storage)['data'];
    }

    return new Promise((resolve, reject) => {
      axios({
        url,

        ...extra,
        headers: { ...headers, ...extra.headers },
        timeout: 50 * 1000,
      })
        .then(resp => {
          if (!!resp.data.errors) {
            reject(resp.data.errors);
          }
          else {
            const { data } = resp;
            resolve(data);
            localStorage.setItem(url, JSON.stringify({ data, timer: new Date().getTime() + 60 * 1000 }));
          }
        })
        .catch(error => reject(error));
    });
  };

  return {
    request,
  };
};

export default AppAPI();
