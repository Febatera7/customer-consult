import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Logon from './pages/Logon';
import Home from './pages/Home';
import Register from './pages/Register';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  )
}