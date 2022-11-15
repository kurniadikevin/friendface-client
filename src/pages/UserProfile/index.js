import './style.css';
import { Link, useParams } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import ProfileForm from '../../components/profileForm';
import ImageForm from '../../components/imageForm';
import CommentForm from '../../components/commentForm';
import axios from 'axios';


export function UserProfilePage(props) {
  
  const [postData,setPostData]= useState([]);
  const [userData,setUserData]= useState(
    { username : 'loading',
      email : 'loading' , profilePicture : ''});

   let {userId} = useParams(); 

   const fetchPostData = async ()=>{
    const url=`http://localhost:5000/posts/${userId}`;
    const response = await fetch(url);
    var data = await response.json();
    setPostData(data);
    }

    const fetchUserData = async ()=>{
        const url=`http://localhost:5000/users/${userId}`;
        const response = await fetch(url);
        var data = await response.json();
        setUserData(data[0]);
        }
    
    const toggleForm = (form)=>{
      const Form = document.querySelector(`#${form}`);
      if(Form.style.display === 'inline'){
          Form.style.display ='none';
      } else{  Form.style.display='inline'}
  } 

  const toggleCommentForm = (i)=>{
    const commentForm = document.querySelectorAll('.comment-section');
    if(commentForm[i].style.display === 'inline'){
        commentForm[i].style.display ='none';
    } else{  commentForm[i].style.display='inline'}
  }

  const sendFriendRequest=()=>{
    axios({
      method : "POST",
      data : {
        requestData :{
            sender :  props.currentUser,
            status : 'pending'
        }
      },
      withCredentials : true,
      url : `http://localhost:5000/users/friendRequest/${userId}`
    }).then(function(response){
      console.log(response);
      alert('friend request send')
    })
    .catch(function(error){
      console.log(error);
    })
  }


    useEffect(()=>{
      fetchPostData();
      fetchUserData();
      
    },[])


  return (
    <div className="App">
      <Dashboard currentUser={props.currentUser} dashIndex={1} />
      <div className='main' id='profile-main'>
        <div className='profile-head'>
          <div className='profile-pic-cont'>
            <img id='profileImgProfile' src= {userData?.profilePicture ? `http://localhost:5000/${userData.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))} alt='userPicture'
                      width={100} height={100}/>
           
          </div>

          <div className='profile-detail'>
            <div className='profile-row1'>
               <div className='profile-username'>
                  <div className='tag'>Username :</div>
                  <div className='text'> {userData?.username ? userData.username : 'Not Set'} </div>
              </div>
              <div className='profile-email'>
                <div className='tag'>Email :</div>
                <div className='text'> {userData? userData.email : 'Not available'}</div>
              </div>        
            </div>
            <div className='profile-row2'>
              <div>Friend</div>
              <div></div>
            </div>
            <div className='profile-row3'>
              <button onClick={sendFriendRequest}>Add as Friend</button>
            </div>
          </div>
        </div>

        <div className='profile-body'>

        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div className='post-container'>
                <div className='post-sidebar'>    
                  <img  id='profileImg' src={item.author?.profilePicture ?  `http://localhost:5000/${item.author.profilePicture} `
                     : (require('../../assets/profilepicturesSmall.png'))}
                   alt='profileImage'  width={50} height={50}/>
                </div>
                <div className='post-main'>
                  <div className='post-text'>{item.text}</div>
                  <div className='post-author'>{item.author ? item.author.username : 'anon'}</div>
                  <div className='post-date'>{item.date}</div>
                  <div className='action-cont'>
                    <div className='like-cont'>
                      <span id='like-icon' class="material-symbols-outlined">favorite</span>
                      <div>{item.likes.length}</div>
                    </div>
                    <div className='comment-cont'>
                    <span id='comment-icon' class="material-symbols-outlined"
                    onClick={()=> toggleCommentForm(index)}>mode_comment</span>
                    <div>{item.comment.length}</div>
                  </div>  
                 </div>
                 <div className='comment-section'>
                <CommentForm currentUser={props.currentUser} post= {item} index={index}/>
                <div className='comment-map'>{((item.comment).reverse()).map(function(comment,index){
                    return(
                      <div className='comment-content'>
                        <div className='comment-text'>{comment.text}</div>
                        <div className='comment-username'>{comment.author?.username}</div>
                        <div className='comment-date'>{comment.date}</div>
                      </div>
                    )
                })
                }</div>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}

