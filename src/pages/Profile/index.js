import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';

export function ProfilePage() {
  return (
    <div className="App">
      <Dashboard/>
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'></div>
          <div className='profile-detail'></div>
        </div>
        <div className='profile-body'></div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

