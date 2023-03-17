import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { DisplayPost } from '../../components/displayPost';


export function HomePage() {

// get login user information
const getUser=()=>{
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }}

 let currentUser= getUser();

  return (
  <div className="App">
    
    <Dashboard  dashIndex={0}/>
    <div className='main'  id='home-page'>
      <HomeComp currentUser={currentUser}/>
      <DisplayPost currentUser={currentUser} urlExtension={`friends/${currentUser._id}/`}/>
    </div>
    
    <Sidebar/>
  </div>
  );
}
