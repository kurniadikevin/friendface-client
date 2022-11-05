import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { useState, useEffect } from 'react';


export function HomePage() {

  const [postData,setPostData]=useState([])

  const url='http://localhost:5000/posts';

  const fetchPostData = async ()=>{
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    setPostData(data);
    }


    
    useEffect(()=>{
      fetchPostData();
    },[])

  return (
    <div className="App">
      <Dashboard/>
      
      <div className='main'  id='home-page'>
        <HomeComp/>
        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>
                 {(()=>{
                  if(item.profilePicture){
                    return(
                      <img  id='profileImg' src={require(item.profilePicture)}/>
                    )
                  } else{
                    return (
                      <img id='profileImg' src={require('../../assets/profilepicturesSmall.png')} alt='profilePicture'
                      width={50} height={50}/>
                    )
                  }
                 })()}
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author}</div>
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
