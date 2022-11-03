import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import {  LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { MessagePage} from './pages/Message';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/profile" exact component={ProfilePage} />
      <Route path="/message" exact component={MessagePage} />
    </Switch>
  </BrowserRouter>
);

export default App;