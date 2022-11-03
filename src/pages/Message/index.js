import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';

export function MessagePage() {
  return (
    <div className="App">
      <Dashboard/>
      <div className='main'>
        <p>page message</p>
      </div>
      
      <Sidebar/>
    </div>
  );
}
