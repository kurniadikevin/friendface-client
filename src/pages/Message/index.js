import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import MessageDashboard from '../../components/messageDashboard/messageDashboard';
import Sidebar from '../../components/sidebar/sidebar';
import { toggleLoader } from '../../components/loader/loader-toggle';
import { getUser, removeAlert } from '../../components/functions';
import {useState, useEffect } from 'react';
import {   useHistory } from 'react-router-dom';
import axios from 'axios';


export function MessagePage() {

  let currentUser= getUser();
  let history = useHistory();
  
  const [userData,setUserData]=useState([]);
  const [autoComplete,setAutoComplete]= useState([]);
  const [searchInput,setSearchInput]= useState();
  const [groupMemberArr,setGroupMemberArr]=useState([]);
  const [newGroupName,setNewGroupName]= useState('');

  const checkUserChatAvailability= async(userId)=>{

    const url=`https://friendface-api-production.up.railway.app/userChat/byUserId/${userId}`
    const response = await fetch(url);
    var data = await response.json();
    if(data.length===0){
     console.log('no data');
     createOrUpdateUserChatData(userId,'create');
    } else{
      console.log('update data');
      createOrUpdateUserChatData(userId,'update');
    }
  }

  const createOrUpdateUserChatData=(userId,action)=>{
    axios({
      method: "POST",
      withCredentials: true,
<<<<<<< HEAD
      url: `https://friendface-api-production.up.railway.app/userChat/${action}/${userId}`,
=======
      url: `http://localhost:5000/userChat/${action}/${userId}`,
      headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
>>>>>>> localdev-bearer
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
  }

  const userDataToQuery = async ()=>{
    const url=`https://friendface-api-production.up.railway.app/users/search`;
    const response = await fetch(url);
    var data = await response.json();
    setUserData(data);
    setAutoComplete(data);
    }

 const filterDataQuery=()=>{
       let resultEmail = userData.filter((item)=>{
          if(item.email){
            return  ((item.email).toLowerCase()).includes(searchInput.toLowerCase());
          }
        })
        let resultUsername = userData.filter((item)=>{
            if(item.username){
            return  ((item.username).toLowerCase()).includes(searchInput.toLowerCase());
            }
          })
        setAutoComplete([...resultEmail,...resultUsername]);
        }

  const createPrivateChatRoom=(item)=>{
    const alertBox = document.querySelector('#alert-box');
    axios({
      method: "POST",
      data: {
        currentUser : currentUser._id,
      },
      withCredentials: true,
<<<<<<< HEAD
      url: `https://friendface-api-production.up.railway.app/chatRoom/createPrivate/${item._id}`,
=======
      headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
      url: `http://localhost:5000/chatRoom/createPrivate/${item._id}`,
>>>>>>> localdev-bearer
    }).then(function (response) {
        
        alertBox.textContent=`New chat room with ${item.username ? item.username : item.email} created !`
        alertBox.style.display='inline';
        setTimeout(()=>{
          // new chat room id for redirect
          history.push(`/messagechat/${response.data._id}`);
        },1000)
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const addToGroupList=(item,index)=>{ 
    const iconAddGroup = document.querySelectorAll('#user-group-add-icon');
    const btnAddGroup = document.querySelectorAll('.user-group-add-btn');
    const newGroupForm = document.querySelector('.new-group-form');
    newGroupForm.style.display='grid';
    setGroupMemberArr((groupMemberArr)=>[...groupMemberArr, item]);
    const alertBox = document.querySelector('#alert-box');
    alertBox.textContent=`Added ${item.email} to group member`
    alertBox.style.display='inline';
    iconAddGroup[index].textContent='done_outline';
    btnAddGroup[index].style.backgroundColor='black';
    btnAddGroup[index].style.color='var(--green)';
    removeAlert();
   
  }

  const submitNewGroup=()=>{
    const alertBox = document.querySelector('#alert-box');
    if(groupMemberArr.length <= 1){
      alertBox.textContent=`Please add minimum of 2 group member before create a group!`
      alertBox.style.display='inline';
    } 
    else if(newGroupName===''){
      alertBox.textContent=`Please enter group name before create a group!`
      alertBox.style.display='inline';
    }
    else{
    axios({
      method: "POST",
      data: {
        currentUser : currentUser._id,
        userIdArr : groupMemberArr,
        groupName : newGroupName
      },
      headers : {  Authorization : `Bearer ${localStorage.getItem("token")}`},
      withCredentials: true,
      url: `https://friendface-api-production.up.railway.app/chatRoom/createGroup`,
    }).then(function (response) {
        alertBox.textContent=`${newGroupName} group created!`
        alertBox.style.display='inline';
        setTimeout(()=>{
           // new chat room id for redirect
          history.push(`/messagechat/${response.data._id}`);
        },3000)
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
  }

  
  useEffect(()=>{
       userDataToQuery();
       toggleLoader();
       checkUserChatAvailability(currentUser._id);
  },[])

  useEffect(()=>{
    if(searchInput){
      filterDataQuery();
    }
  },[searchInput]);

  
  
  return (
    <div className="App">
      <Dashboard  dashIndex={3} />
      <div className='main' id='message-main'>
        <MessageDashboard/>
        <div className='message-content-newChat'>
           <div className='search-bar' id='search-bar-chat'>
               <input type='text' id='search-input' value={searchInput} placeholder='Search user to start new chat with'
                    onChange={(e)=>{ setSearchInput(e.target.value); }} >
                </input>
                <div id='search-logo'>
                    <span class="material-symbols-outlined">search</span>
                </div>
            </div>
            <div className='map-search-new-chat' >
              <div className='new-group-form'>
                <input id='group-name-input' value={newGroupName} onChange={(e)=>{ setNewGroupName(e.target.value); }}
                 placeholder='Enter your group name'>
                </input>
                <div id='add-group-btn' onClick={submitNewGroup}>
                    <span class="material-symbols-outlined">done_all</span>
                </div>
              </div>
              {autoComplete.length === 0 ? <div>No result</div> :
              autoComplete.map((item,index)=>{
                return(
                  <div className='new-chat-query-result'>
                      <div id='query-message' >
                        <img id='new-chat-img'
                          src={item.profilePicture
                          ?  `https://friendface-api-production.up.railway.app/${item.profilePicture} `
                          : (require('../../assets/profilepicturesSmall.png'))} width={55} height={55}
                          />
                        <div className='new-chat-user-info'>
                          <div className='new-chat-username'>{item.username ? item.username : 'Not set'}</div>
                          <div className='new-chat-email'>{item.email}</div>
                          <div className='new-chat-btn-container'>
                            <button id='new-chat-btn' onClick={()=>createPrivateChatRoom(item)}>
                              <span class="material-symbols-outlined">
                                  loupe
                              </span>
                            </button>
                            <button id='new-chat-btn' className='user-group-add-btn' onClick={()=>addToGroupList(item,index)}>
                              <span class="material-symbols-outlined" id='user-group-add-icon'>
                              group_add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                  </div>
                  )    })}
                </div>    
        </div>
      </div>
      
      <Sidebar/>
    </div>
  );
}
