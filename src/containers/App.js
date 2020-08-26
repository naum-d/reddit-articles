import React from 'react';

import FloatButton from '../components/FloatButton';
import ArticlesList from '../components/ArticlesList';

const App = () => {
  return (
    <div>
      <FloatButton name="frontend" label="Frontend" />
      <FloatButton name="reactjs" label="ReactJS" />
      <FloatButton name="vuejs" label="VueJS" />
      <FloatButton name="angular" label="Angular" />

      <ArticlesList />
    </div>
  );
};

export default App;
