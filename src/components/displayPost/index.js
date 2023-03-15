import './style.css';
import CommentForm from '../../components/commentForm';
import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { formatDate,formatTimeStamp } from '../../components/functions';

export function DisplayPost(props){

    const [postData,setPostData]=useState([]);
    const [postPage,setPostPage]= useState(1);
    const [nullData,setNullData]= useState(false);

    let currentUser = props.currentUser;
    let {userId} = useParams(); 

    //fetch post data pages
  const fetchPostDataPage = async (page,urlExtension,newProfile)=>{
    const url=`http://localhost:5000/posts/${urlExtension}page/${page}`;
    const response = await fetch(url);
    var data = await response.json();

    // confirm data null 
    if(data.length === 0){
      setNullData(true);
    }
    // if data length zero or parameter for profilevisit change post
    if(postData.length === 0 || newProfile){
      setPostData(data);
      toggleLoader();
      toggleSeeMore('inline');
    } 
    // else concat data
    else{
      setPostData([...postData, ...data] )
      toggleLoader();
      toggleSeeMore('inline');
    }
    }

     //toggle next page
  const toggleNewPage=()=>{
    if(!nullData){
       setPostPage(postPage + 1);
    } 
     else{
      toggleSeeMore('none');
    }  
  }

  const likePostFunction = (post)=>{
    if( !currentUser){
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Please login for like the post!'
      alertBox.style.display='inline';
    } else{
    if(post.author._id === currentUser._id){
      const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='Cannot like your own post!'
      alertBox.style.display='inline';
    } 
    
    else{
    axios({
      method: "POST",
      data: {
          _id :    post._id,
        likes:   post.likes,
        likeBy :  currentUser._id   
      },
      withCredentials: true,
      url: `http://localhost:5000/posts/likes/${post._id}`,
    }).then(function (response) {  
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Post liked!'
        alertBox.style.display='inline';        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}

 const toggleCommentForm = (i)=>{
  const commentForm = document.querySelectorAll('.comment-section');
  if(commentForm[i].style.display === 'inline'){
      commentForm[i].style.display ='none';
  } else{  commentForm[i].style.display='inline'}
}

//onscroll page
 window.onscroll= function(){
    const spareSpace= 10;
    const bottom = document.documentElement.scrollHeight - document.documentElement.clientHeight <= document.documentElement.scrollTop + spareSpace;
    if(bottom){
      toggleNewPage();
    }
  }
  
  // toggle see more
  const toggleSeeMore =(propDisplay)=>{
    const seeMore =document.querySelector('.seeMore');
   seeMore.style.display=(propDisplay);
  }

  useEffect(()=>{
    if(userId){
      setPostPage(1);
      fetchPostDataPage(postPage,`${userId}/`,true);
    } else{
     fetchPostDataPage(postPage,props.urlExtension);
    }

    },[postPage,userId])
    

    return (
       
        <div className='displayPostCont' >
          
        {postData.map(function(item,index){
          return(
            <div className='post-container'>
              <div className='post-sidebar'>  
                <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
                    : (require('../../assets/profilepicturesSmall.png'))}
                    alt='profileImage' width={50} height={50}/> 
              </div>
            <div className='post-main'>
                <div className='post-text'>{item.text ? item.text : 'No post found'}</div>
                <Link to={`/userProfile/${item.author?._id}`} id='link-user' >
                  <div className='post-author'>{item.author?.username ? item.author.username : 'Not Set'}</div>
                </Link>
                <div className='post-date'>{formatDate(item.date)}</div>
              <div className='action-cont'>
                  <div className='like-cont'>
                    <span id='like-icon' class="material-symbols-outlined" onClick={()=> likePostFunction(item)}>
                      favorite</span>
                    <div className='likes-length'>{item.likes?.length}</div>
                  </div>
                  <div className='comment-cont'>
                    <span id='comment-icon' class="material-symbols-outlined"
                    onClick={()=> toggleCommentForm(index)}>mode_comment</span>
                    <div className='comment-length'>{item.comment?.length}</div>
                  </div>
              </div>
              <div className='comment-section'>
                <div className='comment-title'>Comments</div>
                {item.comment ? 
                <div className='comment-map'>{((item.comment)).map(function(comment,index){
                    return(
                      <div className='comment-content'>
                        <div className='comment-text'>{comment.text}</div>
                        <div className='comment-username'>{comment.author?.username}</div>
                        <div className='comment-date'>{formatTimeStamp(comment.date)}</div>
                      </div>
                    )
                })
                }</div>
              : <div className='comment-map' ></div>}
                <CommentForm currentUser={currentUser} post= {item} index={index}/>
               </div>
              </div>
            </div>
          )
        })}
         <div className='seeMore' onClick={toggleNewPage}>See more...</div>
      </div>
           
     
    )
}
