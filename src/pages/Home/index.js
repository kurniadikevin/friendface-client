import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard';

export function HomePage() {
  return (
    <div className="App">
      <Dashboard/>
      <div className='home-main'>
        <p>page 1</p>
      </div>
      
    </div>
  );
}
