import React from 'react';
import { useParams } from 'react-router-dom';

import { NotFound } from 'components';

const generatePage = pageName => {
  const component = () => require(`pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();

  const pageName = id ? `${page}/[id]` : page;

  return generatePage(pageName);
}

export default PageRender;
