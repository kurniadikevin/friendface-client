import { useState } from "react";
import './style.css';
import axios from "axios";

const CommentForm= (props)=>{

    const [comment,setComment]= useState('');
    let currentUser = props?.currentUser;

    const toggleCommentForm = (i)=>{
        const commentForm = document.querySelectorAll('.comment-section');
        if(commentForm[i].style.display === 'inline'){
            commentForm[i].style.display ='none';
        } else{  commentForm[i].style.display='inline'}
    }

    const createComment= (post)=>{
  
        axios({
          method: "POST",
          data: {
              _id :    post._id,
            commentBy : currentUser,
            text : comment,
            
          },
          withCredentials: true,
          url: `http://localhost:5000/comments/createComment/${post._id}`,
        }).then(function (response) {
           
            const alertBox = document.querySelector('#alert-box');
            alertBox.textContent='Comment created!'
            alertBox.style.display='inline';
            setComment('')
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return(

    <div className='comment-form'>
        <div className='newComment-form'>
            <div className='newComment-main'>
                <textarea id='newComment-text' name='text'
                value={comment} onChange={(e)=> setComment(e.target.value)}
                cols='50' rows='5'></textarea>
            </div>
            <div className='newComment-button'>
                
                <button id='newComment-submit'onClick={()=> {createComment(props.post) ;
                     toggleCommentForm(props.index)}}>Add</button>
            </div>
            
        </div>
    </div>
      
    )
}

export default CommentForm;