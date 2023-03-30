import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { DisplayPost } from '../../components/displayPost';
import { getUser } from '../../components/functions';

export function HomePage() {

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
