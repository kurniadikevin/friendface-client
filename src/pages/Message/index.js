import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';

export function MessagePage(props) {

  let currentUser= props.currentUser

  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={2} />
      <div className='main'>
        <p>page message</p>
      </div>
      
      <Sidebar/>
    </div>
  );
}
