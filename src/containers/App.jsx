import React, { Fragment } from 'react';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainPage from './MainPage';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />

      <MainPage />
    </Fragment>
  );
};

export default App;
