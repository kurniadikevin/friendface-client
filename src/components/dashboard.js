import { Link } from 'react-router-dom';
import './style.css';

function Dashboard(){

    return(
        <div className="Dashboard">
            <div className='title-dashboard'>
                <h2>Friendface</h2>
            </div>
            <div className='links-cont'>
                <div>
                    <Link to='./'><div  id='dash-link'>Home</div></Link>
                </div>
                <div>
                    <Link to='/'><div  id='dash-link'>Profile</div></Link>
                </div>
                <div>
                    <Link to='/'><div  id='dash-link'>Message</div></Link>
                </div>
                <div>
                    <Link to='/login'><div  id='dash-link'>Log in</div></Link>
                </div>
            </div>
            <div className='dashboard-bottom'></div>
        </div>
    )
}

export default Dashboard;