import React, { useState, createContext, useContext } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import {  LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { MessagePage} from './pages/Message';
import { UserProfilePage } from './pages/UserProfile';
import { NotificationPage } from './pages/Notification';

const App = () =>{ 

  const[userData,setUserData] = useState()
  
  const pull_data = (data) => { 
    setUserData(data);
  }

  return(
 
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
          <HomePage currentUser={userData}/>
      </Route> 
      <Route path="/login" >
          <LoginPage  func={pull_data}/>
      </Route>
      <Route  path="/profile" >
          <ProfilePage currentUser={userData}/>
      </Route>
      <Route path="/message">
          <MessagePage  currentUser={userData}/>  
      </Route> 
      <Route path="/notification">
          <NotificationPage  currentUser={userData}/>  
      </Route> 
      <Route path='/userProfile/:userId'>
          <UserProfilePage currentUser={userData}/>
      </Route>
    </Switch>
  </BrowserRouter>
 
)};

export default App;