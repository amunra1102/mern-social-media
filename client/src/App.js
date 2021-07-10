import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Home, Login, Register } from 'pages';

import { PageRender, PrivateRouter } from 'middleware';

import { Notify } from 'components';

import { refreshToken } from 'redux/auth/auth.action';

const App = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Notify />

      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />

          {/* <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} /> */}

        </div>
      </div>
    </Router>
  );
};

export default App;
