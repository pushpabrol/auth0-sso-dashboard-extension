import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
import { push, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

import { loadCredentials } from './actions/auth';
import routes from './routes';
import configureStore from './store/configureStore';

const showDevTools = (process.env.NODE_ENV !== 'production') ? require('./showDevTools') : null;

// Make axios aware of the base path.
axios.defaults.baseURL = window.config.BASE_URL;

// Make history aware of the base path.
const history = useRouterHistory(createHistory)({
  basename: window.config.BASE_PATH || ''
});

const store = configureStore([ routerMiddleware(history) ], {});
const reduxHistory = syncHistoryWithStore(history, store);

store.dispatch(loadCredentials());

// Render application.
ReactDOM.render(
  <Provider store={store}>
    {routes(reduxHistory)}
  </Provider>,
  document.getElementById('app')
);

store.dispatch(push('/applications'));

// Show the developer tools.
if (showDevTools) {
  showDevTools(store);
}
