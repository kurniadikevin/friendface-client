import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';


function HomeComp(props){
    const [currentUser,setCurrentUser] = useState({username : 'not sign in', email: 'not email'});
    const [postText,setPostText]= useState('');
    const [render,setRender]= useState(false);
    const [searchInput,setSearchInput]= useState('');
    const [queryData,setQueryData]= useState([]);
    const [autoComplete,setAutoComplete]=useState([]);


    const togglePostForm = ()=>{
        const postForm = document.querySelector('.homeComp-postForm');
        if(postForm.style.display === 'inline'){
            postForm.style.display ='none';
        } else{  postForm.style.display='inline'}
    }

    const toggleImageForm = ()=>{
        const postForm = document.querySelector('.homeComp-imageForm');
        if(postForm.style.display === 'inline'){
            postForm.style.display ='none';
        } else{  postForm.style.display='inline'}
    }

    const createPost = async()=> {  
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Post created!'
        alertBox.style.display='inline';

        axios({
          method: "POST",
          data: {
            text : postText,
            authorId : currentUser._id
          },
          withCredentials: true,
          url: "http://localhost:5000/posts/newpost",
        }).then(function (response) {
           
            setRender(true);
            
          })
          .catch(function (error) {
            console.log(error);
          });    
    }

    const userDataToQuery = async ()=>{
        const url=`http://localhost:5000/users/search`;
        const response = await fetch(url);
        var data = await response.json();
        setQueryData(data);
        }
    
    const filterDataQuery=()=>{
       let resultEmail = queryData.filter((item)=>{
          return  ((item.email).toLowerCase()).includes(searchInput.toLowerCase());
        })
        let resultUsername = queryData.filter((item)=>{
            if(item.username){
            return  ((item.username).toLowerCase()).includes(searchInput.toLowerCase());
            }
          })
      
        setAutoComplete([...resultEmail,...resultUsername]);
    }

    const removeQueryBox = ()=>{
        const queryBox = document.querySelector('#query-auto');
        queryBox.style.display='none';
    }
   
    
    useEffect(()=>{
       setCurrentUser(props.currentUser);
       filterDataQuery();
       userDataToQuery();//can be called once
       const queryBox = document.querySelector('#query-auto');
       if(searchInput !== ''){
        queryBox.style.display='inline';
       } else if(searchInput === ''){
        removeQueryBox();
       }
    },[searchInput])

    return (
        <div className='HomeComp'>
            <div className='HomeCompHead'>
                <div className='home-head'>
                    <button id='make-post' onClick={togglePostForm}>New post</button>
                    <button id='make-post' onClick={toggleImageForm}>Post image</button>
                </div>
                <div className='search-bar'>
                    <input type='text' id='search-input' value={searchInput} placeholder='search user'
                    onChange={(e)=>{ setSearchInput(e.target.value)}} >
                    </input>
                    <div id='search-logo'>
                    <span class="material-symbols-outlined">search</span>
                    </div>
                </div>
                <div id='query-auto'>
                    {autoComplete.length === 0 ? <div>No result</div> :
                    autoComplete.map((item)=>{
                        return(
                            <div className='query-result'>
                                <Link id='query-link' to={`/userProfile/${item._id}`}>
                                <div>{item.username}</div>
                                <div>{item.email}</div>
                                </Link>
                            </div>
                        )    })}
                </div>
            </div>
            <div className='homeComp-postForm'>
                <div className='newpost-form' >
                    <div className='newpost-main'>
                        <textarea id='newpost-text' name='text'
                        value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                    </div>
                    <div className='newpost-button'>
                    <input type='file' name='imagePost'  ></input>
                        <button id='newpost-submit'onClick={()=> {createPost() ; togglePostForm()}}>Post</button>
                    </div>
                    
                </div>
            </div>

            <div className='homeComp-imageForm'>
                <div className='newpost-form' >
                    <div className='newpost-main'>
                        <textarea id='newpost-text' name='text'
                        value={postText} onChange={(e)=> setPostText(e.target.value)}></textarea>
                    </div>
                    <div className='newpost-button'>
                    <input type='file' name='imagePost'  ></input>
                        <button id='newpost-submit'onClick={()=> {createPost() ; togglePostForm()}}>Post</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HomeComp;