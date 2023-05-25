import './style.css';
import CommentForm from '../../components/commentForm';
import { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { formatDate,removeAlert,toggleCommentSection, 
  displayDateDifferences, toggleCommentForm} from '../../components/functions';

export function DisplayPost(props){

    const [postData,setPostData]=useState([]);
    const [postPage,setPostPage]= useState(1);
    const [nullData,setNullData]= useState(false);

    let currentUser = props.currentUser;
    let {userId} = useParams(); 

    //fetch post data pages
  const fetchPostDataPage = async (page,urlExtension,newProfile)=>{
    try {
      const url=`http://localhost:5000/posts/${urlExtension}page/${page}`;
    const response = await fetch(url);
    var data = await response.json();
    } catch (error) {
      console.log(error)  
      if(page === 1){
        const alertBox = document.querySelector('#alert-box');
      alertBox.textContent='No post available! Please be friend with other user or post something to see profile'
      alertBox.style.display='inline';
      toggleLoader();
      removeAlert();
      }
    }

    // confirm data null 
    if(data.length === 0){
      if(page === 1){
        setPostData([]);
      }
      setNullData(true);
    }
    
      // if data length zero or parameter for profilevisit change post
    else if(page === 1 && newProfile ){
      setPostData(data);
      toggleLoader();
      toggleSeeMore('inline');
      displayLikedPost(data);
    } 

    // if new profile/profile visit and data more than one page
    else if(newProfile && postData.length > 0){
      setPostData([...postData, ...data] )
      toggleLoader();
      toggleSeeMore('inline');
      displayLikedPost([...postData, ...data]);
    }
  
    // else concat data
    else{
      setPostData([...postData, ...data] )
      toggleLoader();
      toggleSeeMore('inline');
      displayLikedPost([...postData, ...data]);
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

  const likePostFunction = (post,index)=>{
    const alertBox = document.querySelector('#alert-box');
    const likesList = post.likes;
    const sameLike = likesList.filter((item)=>{
     return item === currentUser._id
    })

    const likeIcon= document.querySelectorAll('#like-icon');


    if( !currentUser){
      alertBox.textContent='Please login for like the post!'
      alertBox.style.display='inline';
      removeAlert();
    } else{
    if(post.author?._id === currentUser._id){
      alertBox.textContent='Cannot like your own post!'
      alertBox.style.display='inline';
      removeAlert();
    }
    // prevet user to like more than once
    else if(sameLike.length > 0 || likeIcon[index].style.color==='var(--pink)' ){
      alertBox.textContent='You already like this post'
      alertBox.style.display='inline';
      removeAlert();
    } 
    
    else{
      const likeByAuthor={
        _id : currentUser._id,
        email : currentUser.email,
        username : currentUser.username
    }
    axios({
      method: "POST",
      data: {
          _id :    post._id,
        likes:   post.likes,
        likeBy :  likeByAuthor   
      },
      headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
      withCredentials: true,
      url: `http://localhost:5000/posts/likes/${post._id}`,
    }).then(function (response) {  
        alertBox.textContent='Post liked!'
        alertBox.style.display='inline';
        removeAlert();
        const likesCount = document.querySelectorAll('.likes-length');
        likesCount[index].textContent= post.likes.length + 1;
        const likeIcon = document.querySelectorAll('#like-icon');
        likeIcon[index].style.color='var(--pink)';
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        alertBox.textContent='Server overload / Error'
        alertBox.style.display='inline';
        removeAlert();
      });
    }
  }
}


  //show comment form by default if post has no comment
  const displayDefaultCommentForm=(item,index)=>{
    if(item.comment.length === 0){
      toggleCommentSection(index,'block')
    } else{
      toggleCommentSection(index,'none')
    }
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
    if(seeMore){
      seeMore.style.display=(propDisplay);
    }
  }

  // make different display for post current user already liked
  const displayLikedPost =(postData)=>{ 
    for (let i=0; i<postData.length; i++){
      const likesList = postData[i].likes;
      const sameLike = likesList.filter((item)=>{
      return item._id === currentUser._id;
      })
      const sameLikeOldFormat = likesList.filter((item)=>{
        return item === currentUser._id;
        })
      if(sameLike.length > 0 || sameLikeOldFormat.length > 0){
        const likeIcon = document.querySelectorAll('#like-icon');
        likeIcon[i].style.color='var(--pink)';
      }
    }}

    const showDeleteIcon=(item,index)=>{
      if( item.author._id === currentUser._id){
        return(
          <div className='delete-cont'>
          <span id='delete-icon' class="material-symbols-outlined"
          onClick={()=> deleteUserPost(item._id,index)}>
            delete
          </span>
       </div>
        )
      } 
    }

    //delete user post
    const deleteUserPost=(postId,index)=>{
      const alertBox = document.querySelector('#alert-box');
      axios({
        method: "POST",
        withCredentials: true,
        url: `http://localhost:5000/posts/delete/${postId}`,
        headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
      }).then(function (response) {  
          alertBox.textContent='Post deleted!'
          alertBox.style.display='inline';
          const postContainer= document.querySelectorAll('.post-container');
          postContainer[index].style.display='none';
          removeAlert();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          alertBox.textContent='Server overload / Error'
          alertBox.style.display='inline';
          removeAlert();
        });
    }


  // fetch for post page change
  useEffect(()=>{ 
      fetchPostDataPage(postPage,props.urlExtension);
    },[postPage])

  // fetch for userId parameter change
  useEffect(()=>{
      if(userId){
      setPostPage(1);
      fetchPostDataPage(postPage,`byUser/${userId}/`,true);
      }
    },[userId])
    

    return (
       
        <div className='displayPostCont' id={props.singlePost ? 'post-detail-display' : ''}>
          
        {postData.map(function(item,index){
         
          return(
            <div className='post-container'>
              <div className='post-sidebar'>  
                <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
                    : (require('../../assets/profilepicturesSmall.png'))}
                    alt='profileImage' width={50} height={50}/> 
              </div>
            <div className='post-main'>
               { item.imageContent ?  
                <Link to={`/postDetail/${item._id}`} >
                 <div className='post-image'>
                  <img id='post-image' src={ `http://localhost:5000/${item.imageContent} `}
                    height={200} >
                  </img>
                </div>
                </Link> : '' }
                <Link to={`/postDetail/${item._id}`} >
                 <div className='post-text'>{item.text ? item.text : ''}</div>
                </Link>
                <Link to={`/userProfile/${item.author?._id}`} id='link-user'>
                  <div className='post-author'>{item.author?.username ? item.author.username : item.author?.email}</div>
                </Link>
                <div className='post-date'>{displayDateDifferences(item.date)}</div>
              <div className='action-cont'>
                  <div className='like-cont'>
                    <span id='like-icon' class="material-symbols-outlined" onClick={()=> likePostFunction(item,index)} >
                      favorite</span>
                    <div className='likes-length'>{item.likes?.length}</div>
                  </div>
                  <div className='comment-cont'>
                    <span id='comment-icon' class="material-symbols-outlined"
                    onClick={()=> displayDefaultCommentForm(item,index)}
                    >mode_comment</span>
                    <div className='comment-length'>{item.comment?.length}</div>
                  </div>
                  {/* conditional currentUser is author */}
                  <div>{item.author?._id ? showDeleteIcon(item,index): ''}</div>
              </div>
              <div className='comment-section'>
                <div className='comment-title'>Comments</div>
                {item.comment ? 
                <div className='comment-map'>{((item.comment)).map(function(comment,index){
                    return(
                      <div className='comment-content'>
                        <div className='comment-text'>{comment.text}</div>
                        <Link to={`/userProfile/${comment.author?._id}`}>
                        <div className='comment-username'>{comment.author?.username ? comment.author?.username : comment.author?.email  }
                        </div>
                        </Link>
                        <div className='comment-date'>{displayDateDifferences(comment.date)}</div>
                      </div>
                    )
                })
                }</div>
              : <div className='comment-map' ></div>}
                <div onClick={()=>{toggleCommentForm(index)}}>
                   <span class="material-symbols-outlined" id='toggle-comment-icon'>
                   reply
                  </span>
                </div>
                
                <CommentForm currentUser={currentUser} post= {item} index={index}/>
               </div>
              </div>
            </div>
          )
        })}
        { props.singlePost === true ? '':
           <div className='seeMore' onClick={toggleNewPage}>See more...</div>
         }
        
      </div>
           
     
    )
}
