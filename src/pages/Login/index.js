import './style.css';
import axios from 'axios';
import { useState } from 'react';

export function LoginPage() {

  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [currentUser, setCurrentUser]= useState('not log in');
 
  const toggleFormLogin = ()=>{
    const signupForm = document.querySelector('#signup-wrap');
    const loginForm = document.querySelector('#login-wrap');
    const signupToggle = document.querySelector('.signup-toggle');
    const loginToggle = document.querySelector('.login-toggle');

    loginForm.style.display= "flex";
    signupForm.style.display='none';
    loginToggle.style.borderBottom='1px solid white';
    signupToggle.style.borderBottom='none';
  }

  const toggleFormSignup = ()=>{
    const signupForm = document.querySelector('#signup-wrap');
    const loginForm = document.querySelector('#login-wrap');
    const signupToggle = document.querySelector('.signup-toggle');
    const loginToggle = document.querySelector('.login-toggle');

    signupForm.style.display= "flex";
    loginForm.style.display='none';
    signupToggle.style.borderBottom='1px solid white';
    loginToggle.style.borderBottom='none';
  }


  // post form login using axios
  const loginUser = async(e)=>{
    e.preventDefault()
    const article = { 
       email : email,
    password : password};
    await axios.post('http://localhost:5000/users/login', article).then(
        (res)=> {
          setCurrentUser('login as admin')
        console.log(res.config.data)
      }
      ).catch((error) => console.log(error));
}

  return (
    <div className="Login">
        <div className='login-box'>
          <div className='login-head'>
            <h2>Friendface</h2>
            <p>{currentUser}</p>
          </div>

            <div className='sign-select'>
              <div className='signup-toggle'onClick={toggleFormSignup}>Sign-up</div>   
              <div className='login-toggle' onClick={toggleFormLogin}>Log-in</div> 
          </div>

          <div className='sign-form'>

          {/*   sign up form */}
            <form className='form-sign' id='signup-wrap'  method='POST' action='http://localhost:5000/users/signup'>
              <div className='email-cont'>
                <label for='email'>Email</label>
                <input type='text' name='email' placeholder='email'></input>
              </div>
              <div className='pass-cont'>
                <label for='password'>Password</label>
                <input type='password' name='password' placeholder='password'></input>
              </div>
              <button type='submit' className='submit-btn'>Sign Up</button>
            </form>

          {/* login form */}
          <div className='form-sign' id='login-wrap' >
              <div className='email-cont'>
                <label for='email'>Email</label>
                <input type='email'  placeholder='email' name='email' 
                 value={email} onChange={(e)=> setEmail((e.target.value))}></input>
              </div>
              <div className='pass-cont'>
                <label for='password'>Password</label>
                <input type='password' placeholder='password' name='password'  
                  value={password} onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <button type='submit'  className='submit-btn'  onClick={loginUser} >Log in</button>
          </div>              
          </div>
          
        

        </div>
    </div>
  );
}
