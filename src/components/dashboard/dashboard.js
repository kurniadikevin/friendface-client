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
                    <Link to='./' id='link-cont'>
                        <div  id='dash-link'>Home</div>
                        <span class="material-symbols-outlined">cottage</span>
                        </Link>
                </div>
                <div>
                    <Link to='/profile' id='link-cont'>
                        <div  id='dash-link'>Profile</div>
                        <span class="material-symbols-outlined">account_circle</span>
                        </Link>
                </div>
                <div>
                    <Link to='/message' id='link-cont'>
                        <div  id='dash-link'>Message</div>
                        <span class="material-symbols-outlined">forum</span>
                        </Link>
                </div>
                <div>
                    <Link to='/login' id='link-cont'>
                        <div id='dash-link'>Log in</div>
                        <span class="material-symbols-outlined">login</span>
                    </Link>
                </div>
            </div>
            <div className='dashboard-bottom'></div>
        </div>
    )
}

export default Dashboard;