import { getUser } from '../functions';
import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { toggleLoader } from '../loader/loader-toggle';

const MessageDashboard=()=>{
    
    let currentUser= getUser();

    const [chatRoomList,setChatRoomList]= useState([]);
    const [chatRoomUserInfoList,setChatRoomUserInfoList]= useState([]);
  
    const fetchUserChatRoomList= async (userId)=>{
      try{
        const url=`http://localhost:5000/userChat/byUserId/${userId}`
        const response = await fetch(url);
        var data = await response.json();
        const listChat = data[0].chatRoomList;
        setChatRoomList(data[0].chatRoomList);
        const filterListChat = listChat.map((i)=>{
          //group chat list show all id
          if((i.membersId).length > 2){
          return i.membersId;
          }
          //private chat list show only foreign id in string format
          else if((i.membersId).length === 2){
           const foreignMemberId= (i.membersId).filter((id)=> {
            return id !== currentUser._id;
           })
           return foreignMemberId[0];
          }
          
        });
        getUserInfoOnChatRoom(filterListChat);
        console.log(filterListChat);
      }
      catch(err){
        console.log(err)
      }
    }
  
  
    const getUserInfoOnChatRoom=(sourceData)=>{
       const data = Promise.all(
          sourceData.map(async (i) => {
            if(typeof i === 'object'){
               const resultArr=[];
                i.forEach(async(j)=>{
                const data= (await fetch(`http://localhost:5000/users/simplified/${j}`, {
                method: "GET",
                })).json();
                data.then((value)=>{
                  resultArr.push(value[0]); 
                })
              })
            return resultArr;
            } else{
              const result= (await fetch(`http://localhost:5000/users/simplified/${i}`, {
              method: "GET",
            })).json()
            return result;
          }}
          )
      ).then((value)=>{
      //  console.log(value);
        const memberValue= value.map((i)=>{
          if(i.length === 1){
            return i[0];
          } else {
            return i;
          }
        })
        setChatRoomUserInfoList(memberValue);
      //  console.log(memberValue);
    })
    }
    
  
    useEffect(()=>{
      fetchUserChatRoomList(currentUser._id);
      
    },[])

    return(
        <div className='message-dashboard'>
          {chatRoomUserInfoList.map((item,index)=>{

          return(
            <div className='chatRoom-container'>
              <Link  to={`/messagechat/${chatRoomList[index]._id}`}>
              
              <div className='chatRoom-member'>
                { item.length > 1 ?
                 <div >
                  <div id='groupChat-text'>Group Chat</div>
                  {item.map((i)=>{
                    return(<div>{/* <b>{i.username}</b>  */} {i.email}</div>)
                  })}
                </div> 
                : <div>{item.username}  {item.email}</div>}
                </div>
              <div className='chatRoom-lastContent'>chat last content</div>
              </Link>
          </div>
          )
          })}
        </div>
    )

}


export default MessageDashboard;