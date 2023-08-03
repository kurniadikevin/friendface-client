import { useState } from "react";
import './style.css';
import axios from "axios";
import {removeAlert, formatTimeStamp, toggleCommentForm, handleKeyEnter} from '../functions';


const CommentForm= (props)=>{

    const [comment,setComment]= useState('');

    let currentUser = props?.currentUser;

    const createComment= (post,index)=>{
        if(!currentUser){
            const alertBox = document.querySelector('#alert-box');
            alertBox.textContent='Cannot make comment without login !'
            alertBox.style.display='inline';
            removeAlert();
        } else{
        const commentAuthor={
            _id : currentUser._id,
            email : currentUser.email,
            username : currentUser.username
        }
        axios({
          method: "POST",
          data: {
              _id :    post._id,
            commentBy : commentAuthor,
            text : comment
          },
          headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
          withCredentials: true,
          url: `http://localhost:5000/comments/createComment/${post._id}`,
        }).then(function (response) {
            const lastComment= (JSON.parse(response.config.data));
            const alertBox = document.querySelector('#alert-box');
            alertBox.textContent='Comment created!'
            alertBox.style.display='inline';
            removeAlert();
            setComment('');
            displayLastComment(lastComment);
            displayIncrementCommentCount();
            toggleCommentForm(index);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }

    // display only last comment to create on client before replace with real data
    const displayLastComment=(comment)=>{
      const currentDate= new Date().getTime();
      const commentContainerMap= document.querySelectorAll('.comment-map');
      commentContainerMap[props.index].innerHTML +=`
      <div class='comment-content'>
      <div class='comment-text'>${comment.text}</div>
      <div class='comment-username'>${comment.commentBy.username}</div>
      <div class='comment-date'>${formatTimeStamp(currentDate)}</div>
    </div>`  
    }

    const displayIncrementCommentCount=()=>{
        const commentCount = document.querySelectorAll('.comment-length');
        (commentCount[props.index]).textContent= props.post.comment.length + 1;
    }

    useState(()=>{
       
    },[])

    return(

    <div className='comment-form'>
        <div className='newComment-form'>
            <div className='newComment-main'>
                <textarea id='newComment-text' name='text' placeholder="add comment here"
                value={comment} onChange={(e)=> setComment(e.target.value)}
                onKeyDown={(event)=>{handleKeyEnter(event, ()=> {createComment(props.post,props.index)})}}
                cols='50' rows='5'></textarea>
            </div>
            <div className='newComment-button'>
                
                <button id='newComment-submit'onClick={()=> {createComment(props.post,props.index)}}
                >Add</button>
            </div>
            
        </div>
    </div>
      
    )
}

export default CommentForm;