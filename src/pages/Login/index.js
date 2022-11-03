import logo from '../../logo.svg';
import './style.css';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="Login">
        <div className='login-box'>
          <div className='login-head'>
            <h2>Friendface login</h2>
          </div>

          <div className='login-form'>
            <form id='form-login'>
              <div className='email-cont'>
                <label>Email</label>
                <input type='text'></input>
              </div>
              <div className='pass-cont'>
                <label>Password</label>
                <input type='password'></input>
              </div>
            </form>            
          </div>
          
          <div className='login-bottom'>
            <button>Sign-in</button>
            <button>Sign-up</button>
          </div>

        </div>
    </div>
  );
}
