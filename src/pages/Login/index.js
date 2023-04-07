import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {  useHistory } from "react-router-dom";
import LoaderComponent from '../../components/loader/loader';
import AlertBox from '../../components/alertBox/index';
import {removeAlert,storeCipherPass} from '../../components/functions';

export function LoginPage() {

  let history = useHistory();

  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');

  //setup loader position and display for login
  const loader= document.querySelector('#login-loader');
  if(loader){
    loader.style.display='none';
    loader.style.top='77%';
    loader.style.left='47%';
  }
   
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
      url: "https://odin-book-api-production.up.railway.app/users/login",
    }).then((res) => {
      if(res.data === 'No User Exists'){
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Wrong username or password';
        alertBox.style.display='inline';
        alertBox.style.position="fixed";
        loader.style.display='none';
        removeAlert();
      } else{
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("lastPassword",storeCipherPass(password));
        history.push("/");
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
      url: "https://odin-book-api-production.up.railway.app/users/login",
    }).then((res) => {
      if(res.data === 'No User Exists'){
        alert('Nosa User Exist')
      } else{
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("lastPassword",storeCipherPass('password'))
        history.push("/")
      }    
    });
}

// sign up user using axios then redirect
const signUpUser = async()=>{  
  loader.style.display='inline';
  const alertBox = document.querySelector('#alert-box');
  axios({
    method: "POST",
    data: {
      email: email,
      password: password,
     
    },
    withCredentials: true,
    url: "https://odin-book-api-production.up.railway.app/users/signup",
  }).then((res) => {
    if(res.data === 'No User Exists'){
      alertBox.textContent='Sign up unsuccessful';
      alertBox.style.display='inline';
      alertBox.style.position="fixed";
      loader.style.display='none';
      removeAlert();
    } else{
      alertBox.textContent='Account created!';
      alertBox.style.display='inline';
      alertBox.style.position="fixed";
      loader.style.display='none';
    loginUser();
    }    
  })
  .catch(
    function(error){
      console.log(error.response.data);
      alertBox.textContent='Email already used!';
      alertBox.style.display='inline';
      alertBox.style.position="fixed";
      loader.style.display='none';
      removeAlert();
    }
  )
}

  //fetch all post 
  const fetchRecentUser = async ()=>{
    const url=`http://localhost:5000/users/popular`;
    const response = await fetch(url);
    var data = await response.json();
    localStorage.setItem('userPopular', JSON.stringify(data));
    }

  useEffect(()=>{
    
  //handle logout when login page loaded
  localStorage.clear();
  // fetch recent user when login
  fetchRecentUser();
  },[])

  return (
    <div className="Login">
      <div className='login-col1'></div>

      <div className='login-col2'>
        <div className='login-box'>
          <div className='login-head'>
           
              <h2>Friendface</h2>
            
          </div>

            <div className='sign-select'>
              <div className='signup-toggle'onClick={toggleFormSignup}>Sign-up</div>   
              <div className='login-toggle' onClick={toggleFormLogin}>Log-in</div> 
          </div>

          <div className='sign-form'>

          {/*   sign up form */}
            <div className='form-sign' id='signup-wrap' 
            /*  method='POST'  action='https://odin-book-api-production.up.railway.app/users/signup' */>
              <div className='email-cont'>
                <label for='email'>Email</label>
                <input type='text' name='email' placeholder='email'
                 value={email} onChange={(e)=> setEmail((e.target.value))}
                id='signup-email'></input>
              </div>
              <div className='pass-cont'>
                <label for='password'>Password</label>
                <input type='password' name='password' placeholder='password'
                 value={password} onChange={(e) => setPassword(e.target.value)}
                id='signup-password'></input>
              </div>
              <button type='submit' className='submit-btn' onClick={signUpUser}>Sign Up</button>
            </div>

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
         <AlertBox/> 
        </div>
      <LoaderComponent id='loader-login-page'/>
    
    </div>
  );
}
