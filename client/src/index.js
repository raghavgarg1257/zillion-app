import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';

console.log(API_URL);

const enhancers = compose(
    applyMiddleware(thunk)
    , window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.querySelector('#container')
);
