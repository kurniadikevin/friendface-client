import './style.css';
import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import LoaderComponent from '../../components/loader/loader';



export function LoginPage(props) {

  let history = useHistory();

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [userData,setUserData]= useState({});

  //setup loader position and display for login
  const loader= document.querySelector('#login-loader');
  if(loader){
    loader.style.display='none';
    loader.style.top='77%';
    loader.style.left='47%';

  }
   
  // pull data to app
  props.func(userData);
 
  const toggleFormLogin = ()=>{
    const signupForm = document.querySelector('#signup-wrap');
    const loginForm = document.querySelector('#login-wrap');
    const signupToggle = document.querySelector('.signup-toggle');
    const loginToggle = document.querySelector('.login-toggle');

    loginForm.style.display= "flex";
    signupForm.style.display='none';
    loginToggle.style.borderBottom='1px solid var(--purple)';
    signupToggle.style.borderBottom='none';
  }

  const toggleFormSignup = ()=>{
    const signupForm = document.querySelector('#signup-wrap');
    const loginForm = document.querySelector('#login-wrap');
    const signupToggle = document.querySelector('.signup-toggle');
    const loginToggle = document.querySelector('.login-toggle');

    signupForm.style.display= "flex";
    loginForm.style.display='none';
    signupToggle.style.borderBottom='1px solid var(--purple)';
    loginToggle.style.borderBottom='none';
  }


  // post form login using axios
  const loginUser = async()=>{  
    loader.style.display='inline';
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
       
      },
      withCredentials: true,
      url: "http://localhost:5000/users/login",
    }).then((res) => {
      if(res.data === 'No User Exists'){
        alert('No User Exist')
      } else{
        setUserData(res.data)
        history.push("/")
      }    
    });
}


  // post form login using axios
  const loginUserSample = async()=>{  
    loader.style.display='inline';
    axios({
      method: "POST",
      data: {
        email: 'guest@gmail.com',
        password: 'password',
       
      },
      withCredentials: true,
      url: "http://localhost:5000/users/login",
    }).then((res) => {
      if(res.data === 'No User Exists'){
        alert('No User Exist')
      } else{
        setUserData(res.data)
        history.push("/")
      }    
    });
}

  return (
    <div className="Login">
      <div className='login-col1'></div>

      <div className='login-col2'>
        <div className='login-box'>
          <div className='login-head'>
           
              <h2>Friendface</h2>
            
            <p>{userData.email}</p>
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
              <div>
              <button type='submit'  className='submit-btn'  onClick={loginUser} >Log in</button>
              <button type='submit'  className='submit-btn'  onClick={loginUserSample} >Log Sample user</button>
              {/* <a href="/login/facebook" class="button">Log In With Facebook</a> */}
              </div>
          </div>              
          </div>
        </div>
        </div>
      <LoaderComponent id='loader-login-page'/>
    </div>
  );
}
