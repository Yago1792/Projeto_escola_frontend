import React from 'react';
import { Switch } from 'react-router-dom';
import MyRoute from './MyRoute';

// Pages
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Hello from '../pages/Hello';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="/login" component={Hello} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
