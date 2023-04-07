import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { DisplayPost } from '../../components/displayPost';
import { useEffect} from 'react';
import {  useHistory } from "react-router-dom";
import { getUser } from '../../components/functions';

export function ExplorePage(props) {


  let history = useHistory();


 const removeTabsForGuest=()=>{
  const profileTabs= document.querySelector('#profile-tabs');
   const homeTabs= document.querySelector('#home-tabs');
   const notifTabs= document.querySelector('#notification-tabs');
   profileTabs.style.display='none';
   homeTabs.style.display='none';
   notifTabs.style.display='none';
 }

 let currentUser= getUser();
 useEffect(()=>{
  if(!currentUser){
    removeTabsForGuest();
    history.push("/login");
  }
 },[])

  return (
  <div className="App">
    
    <Dashboard  dashIndex={1}/>
    <div className='main'  id='home-page'>
      <HomeComp currentUser={currentUser}/>
      <DisplayPost currentUser={currentUser} urlExtension={``}/>
    </div>
    
    <Sidebar/>
  </div>
  );
}
