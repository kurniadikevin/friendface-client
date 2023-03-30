import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import {  LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { MessagePage} from './pages/Message';
import { MessageDetailPage } from './pages/MessageDetail';
import { UserProfilePage } from './pages/UserProfile';
import { NotificationPage } from './pages/Notification';
import { ExplorePage } from './pages/Explore';
import { PostDetail } from './pages/PostDetail';

const App = () =>{ 


  return(
 
  <BrowserRouter>
    <Switch>
      <Route exact path="/home">
          <HomePage />
      </Route> 
      <Route exact path="/">
          <ExplorePage />
      </Route>
      <Route path="/login" >
          <LoginPage  />
      </Route>
      <Route  path="/profile" >
          <ProfilePage />
      </Route>
      <Route path="/message">
          <MessagePage  />  
      </Route> 
      <Route path="/notification">
          <NotificationPage  />  
      </Route> 
      <Route path='/userProfile/:userId'>
          <UserProfilePage />
      </Route>
      <Route  path="/messages">
          < MessagePage />
      </Route>
      <Route  path="/messages/:chatRoomId">
          < MessageDetailPage />
      </Route>
      <Route  path="/postDetail/:postId">
          <PostDetail />
      </Route>
    </Switch>
  </BrowserRouter>
 
)};

export default App;