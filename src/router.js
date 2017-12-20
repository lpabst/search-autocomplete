
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home.js';
import Search from './components/Search/Search.js';


export default (
    <Switch>
        
        <Route component={ Home } path='/' exact />
        <Route component={ Search } path='/search' exact />

    </Switch>
)
