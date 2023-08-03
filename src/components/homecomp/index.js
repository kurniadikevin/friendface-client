import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { removeAlert, toggleBluredBg, alertNullPostText,togglePostForm } from '../functions';


function HomeComp(props){
    const [currentUser,setCurrentUser] = useState({username : 'not sign in', email: 'not email'});
    const [postText,setPostText]= useState('');
    const [searchInput,setSearchInput]= useState('');
    const [queryData,setQueryData]= useState([]);
    const [autoComplete,setAutoComplete]=useState([]);
    const [postMode,setPostMode]= useState('text');
    const [imageFile,setImageFile]= useState([]);


    const createPostText = async()=> {  
        if(postText){
        const alertBox = document.querySelector('#alert-box');       
        axios({
          method: "POST",
          data: {
            text : postText,
            authorId : currentUser._id,
          },
          headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
          withCredentials: true,
          url: "http://localhost:5000/posts/newpost",
        }).then(function (response) {
            console.log(response);
            alertBox.textContent='Post created!';
            alertBox.style.display='inline';
            removeAlert();
          })
          .catch(function (error) {
            console.log(error);
            alertBox.textContent='There is a problem on endpoint!';
            alertBox.style.display='inline';
            removeAlert();
          });  
        }  
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

    const toggleImageAndTextForm=(select)=>{
        const textForm= document.querySelector('#postForm-text');
        const imageForm = document.querySelector('#postForm-image');
        if(select === 'text'){
        textForm.style.display='grid';
        imageForm.style.display='none';
        } else if(select === 'image'){
        textForm.style.display='none';
        imageForm.style.display='grid';
        }
    }
   
    const handleFileSelect = (event) => {
        setImageFile(event.target.files);
      }

    const createPostImage= async()=> { 
        const alertBox = document.querySelector('#alert-box');        
        const formData = new FormData();
        formData.append("image", imageFile[0]);
        formData.append('authorId',currentUser._id);
        formData.append('text',postText);
        axios.post('http://localhost:5000/posts/upload-test', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(function (response) {
            console.log(response);
            alertBox.textContent='Image uploaded!';
            alertBox.style.display='inline';
            removeAlert();
    }).catch(function(error){
        // temporary image upload maintenance
        const errorForImageMaintenance='Image feature currently unavailable';
        console.log(error);
        alertBox.textContent=errorForImageMaintenance;
        alertBox.style.display='inline';
        removeAlert();
    })  
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
       toggleImageAndTextForm(postMode);
    },[searchInput,postMode])

    return (
        <div className='HomeComp'>
            <div className='HomeCompHead'>
                <div className='home-head'>
                    <button id='make-post' onClick={()=>{togglePostForm(); toggleBluredBg();}}>New post</button>
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
                <div className='newpost-form' id='postForm-text' >
                    <div className='newpost-main'>
                        <textarea id='newpost-text' name='text'
                        value={postText} onChange={(e)=> setPostText(e.target.value)}
                        placeholder='Post something...'>
                        </textarea>
                    </div>
                    <div className='newpost-button'>
                        <div className='post-type'>
                            <span class="material-symbols-outlined" style={{color : 'var(--purple)'}} >
                            border_color
                            </span>
                            <span class="material-symbols-outlined"
                            onClick={()=> setPostMode('image')}>
                            imagesmode
                            </span>
                        </div>
                        <button id='newpost-submit'onClick={()=> {
                            if (postText.length>0 && imageFile.length === 0){
                                createPostText();
                                togglePostForm();
                              window.location.reload(false);
                            } else if( imageFile.length > 0){
                                createPostImage();
                                togglePostForm();
                                toggleBluredBg();// temporary image upload maintenance
                            }
                            else{
                                alertNullPostText();
                            }
                            }}>
                            Post</button>
                    </div>
                </div>

                <div className='newpost-form' id='postForm-image' >
                    <div className='newpost-main' id='newpost-main-image'>
                       <div className='image-post-header'>Upload image</div>
                       <input type='file' onChange={handleFileSelect} id='image-file'
                        name='image'>
                       </input>
                    </div>
                    <div className='newpost-button'>
                        <div className='post-type'>
                            <span class="material-symbols-outlined"
                            onClick={()=> setPostMode('text')} >
                            border_color
                            </span>
                            <span class="material-symbols-outlined"  style={{color : 'var(--purple)'}}>
                            imagesmode
                            </span>
                        </div>
                        <button id='newpost-submit'onClick={()=> {
                           if (postText.length>0 && imageFile.length === 0){
                            createPostText();
                            togglePostForm();
                            window.location.reload(false);
                            } else if( imageFile.length > 0){
                                createPostImage();
                                togglePostForm();
                                toggleBluredBg();// temporary image upload maintenance
                            }
                            else{
                                alertNullPostText();
                            }
                            }}>Post</button>
                    </div>
                </div>


            </div>
          
        </div>
    )
}

export default HomeComp;