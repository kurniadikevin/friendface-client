import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { useState, useEffect } from 'react';


export function HomePage(props) {

  const [postData,setPostData]=useState([]);
  


  const url='http://localhost:5000/posts';

  const fetchPostData = async ()=>{
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    }
    
    useEffect(()=>{
      fetchPostData();

    },[])

  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser}/>
      
      <div className='main'  id='home-page'>
        <HomeComp currentUser={props.currentUser}/>
        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'> 
               {/*  {item.author ? item.author.profilePicture : 'none'}    */} 
                  <img  id='profileImg' src={item.author ?  `http://localhost:5000/${item.author.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))}
                     alt='profileImage' width={50} height={50}/> 
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author ? item.author.username : 'anon'}</div>
                  <div className='action-cont'>
                    <span id='like-icon' class="material-symbols-outlined">favorite</span>
                    <span id='comment-icon' class="material-symbols-outlined">mode_comment</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      
      <Sidebar/>
    </div>
  );
}
