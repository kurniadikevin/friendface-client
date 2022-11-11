import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { useState, useEffect } from 'react';
import axios from 'axios';


export function HomePage(props) {

  let currentUser = props?.currentUser;
  console.log(currentUser)
  const [postData,setPostData]=useState([]);

  const fetchPostData = async ()=>{
    const url='http://localhost:5000/posts';
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    }
    
  const likePostFunction = (post)=>{
    console.log(post)
    axios({
      method: "POST",
      data: {
          _id :    post._id,
        likes:   post.likes,
        likeBy :  currentUser   
      },
      withCredentials: true,
      url: `http://localhost:5000/posts/likes/${post._id}`,
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  

  useEffect(()=>{
      fetchPostData();
    },[])

  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={0}/>
      
      <div className='main'  id='home-page'>
        <HomeComp currentUser={props.currentUser}/>
        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>  
                  <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))}
                     alt='profileImage' width={50} height={50}/> 
                </div>
                <div className='post-main'>
                  <div>{item._id}</div>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author?.username ? item.author.username : 'anon'}</div>
                  <div className='post-date'>{item.date}</div>
                  <div className='action-cont'>
                    <div>
                      <span id='like-icon' class="material-symbols-outlined" onClick={()=> likePostFunction(item)}>
                        favorite</span>
                      <div>{item.likes.length}</div>
                    </div>
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
