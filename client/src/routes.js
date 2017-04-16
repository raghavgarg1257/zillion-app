import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './components/Layout';
import Main from './components/Main';
import History from './components/History';
import SingleHistory from './components/SingleHistory';

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Main} />
        <Route path="/history" component={History} />
        <Route path="/history/:keyword" component={SingleHistory} />
        <Route path="*" component={Main} />
    </Route>
);
