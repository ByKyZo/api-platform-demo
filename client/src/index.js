import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Router, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
// import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
// import Welcome from './Welcome';

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    /* Add your reducers here */
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

export const Toto = () => <h1>test</h1>;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Routes>
          <Route path="/" component={Toto} strict={true} exact={true} />
          {/* Add your routes here */}
          <Route render={() => <h1>Not Found</h1>} />
        </Routes>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
