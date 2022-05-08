import React from 'react';
import { Switch } from 'react-router-dom';
import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Oi from '../pages/Oi';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} />
      <MyRoute path="/login" component={Oi} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
