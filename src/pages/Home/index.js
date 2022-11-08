import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { useState, useEffect } from 'react';


export function HomePage(props) {

  const [postData,setPostData]=useState([]);
  const [currentUser,setCurrentUser]= useState(props.currentUser)

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
                 {(()=>{
                  if(item.profilePicture){
                    return(
                      <img  id='profileImg' src={require(item.profilePicture)} alt='profileImage'/>
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
