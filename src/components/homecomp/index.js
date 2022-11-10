import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css';




function HomeComp(props){
    const [currentUser,setCurrentUser] = useState({username : 'not sign in', email: 'not email'})
    const [postText,setPostText]= useState('')

 
    
   // console.log(currentUser);
    const togglePostForm = ()=>{
        const postForm = document.querySelector('.homeComp-postForm');
        if(postForm.style.display === 'inline'){
            postForm.style.display ='none';
        } else{  postForm.style.display='inline'}
    }

    const createPost = async()=> {  
        console.log(postText);
       // console.log(currentUser.email)
        axios({
          method: "POST",
          data: {
            text : postText,
            email : currentUser.email
          },
          withCredentials: true,
          url: "http://localhost:5000/posts/newpost",
        }).then(function (response) {
            console.log(response);
           
          })
          .catch(function (error) {
            console.log(error);
          });
         
    }
    



    useEffect(()=>{
       setCurrentUser(props.currentUser)
    },[])

    return (
        <div className='HomeComp'>
            <div className='HomeCompHead'>
                <div className='home-head'>
                    <button id='make-post' onClick={togglePostForm}>Make post</button>
                </div>
                <div className='search-bar'>
                    <input type='text' id='search-input'></input>
                    <div>
                    <span class="material-symbols-outlined">search</span>
                    </div>
                </div>
            </div>
            <div className='homeComp-postForm'>
                <div className='newpost-form' /* method='POST' action="http://localhost:5000/posts/newpost" */>
                    <div className='newpost-main'>
                        <textarea id='newpost-text' name='text'
                        value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                    </div>
                    <div className='newpost-button'>
                       
                        <button id='newpost-submit'onClick={createPost}>Post</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomeComp;