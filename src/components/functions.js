import axios from 'axios';
import { rot13 } from 'simple-cipher-js';

export const formatDate= (value)=>{
    let arrMonths=[null,'Jan','Feb', 'Mar','Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    //console.log(value);
      let valueStr = `${value}`;
      let split = valueStr.split('T');// split error
      let splitYMD= split[0].split('-');
      let monthsNonZero =splitYMD[1].substr(splitYMD[1].length-1);
    //console.log(monthsNonZero);
      let displayDate = `${arrMonths[monthsNonZero]} ${splitYMD[2]}`
      return displayDate;
    }
  
export const formatTimeStamp = (value)=>{
    let date = new Date(value);
     let stringDate =JSON.stringify( date);
   return formatDate(stringDate);
  }

export const parseTimeSort = (timeArr)=>{
  const timeParse=[];
   timeArr.forEach((i)=>{
     timeParse.push(Date.parse(i))
   })
 return timeParse.sort((a,b)=>{
   return a-b
 });
 }
 

export const displayDateDifferences=(value)=>{
  if(typeof value !== 'number'){
  value =  Date.parse(value)
  }
  // in minute value
  let difference=(Date.now() - value)/60000;
  let result= Math.floor(difference);
  if(result< 60){
    return (result < 1 ? `less than a min ago` : `${result} min ago`);
  } else if( result >= 60 && result < 1440){
    const resultHour = Math.floor(result/60);
    return (resultHour === 1 ? `1 hour ago` :`${resultHour} hours ago`);
  } else if( result >= 1440 && result <= 10080){
    const resultDay = Math.floor(result/1440);
    return  (resultDay ===1 ? `1 day ago` : `${resultDay} days ago`);
  } else{
    const date= new Date(value);
    return (
     formatDate(JSON.stringify(date)));
  }
}

//get currentUser Data from localStorage
 export const getUser=()=>{
  const loggedInUser = localStorage.getItem("user");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    return foundUser;
  }}

 //store cipher localpassword in localStorage
 export const storeCipherPass=(str)=>{
  return rot13.encrypt(str); 
 } 

 //load cipher localpassword in localStorage
  const loadCipherPass=(str)=>{
  return rot13.decrypt(str); 
 } 


export const refreshLoginSession=(user)=>{
  const lastPassword= localStorage.getItem('lastPassword');
  const passDecipher= loadCipherPass(lastPassword);
  axios({
    method: "POST",
    data: {
      email: user.email,
      password: passDecipher,
    },
    withCredentials: true,
    url: "https://friendface-api-production.up.railway.app/users/login",
  }).then((res) => {
    if(res.data === 'No User Exists'){
      console.log('No User Exist');
    } else{
      localStorage.setItem("user", JSON.stringify(res.data));
      getAndAssignMessageNotifCount(res.data._id);
    }    
  });
}


export const removeAlert=()=>{
  setTimeout(()=>{
    const alertBox = document.querySelector('#alert-box');
    alertBox.style.display='none';
  },3000)
}

export const toggleCommentSection = (i,commentFormDisplay)=>{
  const commentSection = document.querySelectorAll('.comment-section');
  const commentForm=document.querySelectorAll('.comment-form');

  // hide other comment section if one comment section is displayed
  for( let j= 0; j< commentSection.length; j++){
    if(j !== i){
      commentSection[j].style.display='none';
    }
  }
  // toggle comment section on off
  if(commentSection[i].style.display === 'inline'){
      commentSection[i].style.display ='none';
  } else{  commentSection[i].style.display='inline'}

  // only show comment form if comment length is zero
  commentForm[i].style.display= commentFormDisplay;
}

//toggle comment form
export const toggleCommentForm=(i)=>{
  const commentForm=document.querySelectorAll('.comment-form');
  if(commentForm[i].style.display === 'none'){
    commentForm[i].style.display ='block';
 } else{  commentForm[i].style.display='none'}
}

// clear all displayed comment section
export const clearCommentDisplay=(data)=>{
  const commentSection= document.querySelectorAll('.comment-map');
  for(let i=0; i< data.length; i++ ){
    commentSection.style.display='none';
  }
}

// universal toggle for form using id name of the form as parameter
export const toggleForm = (form)=>{
  const Form = document.querySelector(`#${form}`);
  if(Form.style.display === 'inline'){
      Form.style.display ='none';
  } else{  Form.style.display='inline'}
}

//toggle blurred background
export const toggleBluredBg=()=>{
  const blurredBg= document.querySelector('.blurred-bg-dash');
  const homeComp= document.querySelector('.HomeComp');
  const sidebar= document.querySelector('.Sidebar');
  if(blurredBg.style.display === 'inline'){
      blurredBg.style.display ='none';
      homeComp.style.backgroundColor='var(--background00)';
      homeComp.style.boxShadow=`7px 7px 14px #0d0c14,
      -7px -7px 14px #171626`;
      sidebar.style.zIndex=0;
  } else{ 
       blurredBg.style.display='inline';
       homeComp.style.backgroundColor='transparent';
       homeComp.style.boxShadow='none';
       sidebar.style.zIndex=-1;
      }
}

// alert display for null post 
export const alertNullPostText=()=>{
  const alertBox = document.querySelector('#alert-box');
  alertBox.textContent='Please insert text or image before posting!';
  alertBox.style.display='inline';
  removeAlert();
}

//make action on 'Enter' key down
export const handleKeyEnter=(event,action)=>{
  if(event.key=== 'Enter'){
   action();
  }
 }

 //get and assign messageNotification count to localStorage
 export const getAndAssignMessageNotifCount= async(userId)=>{
  try{
    const url=`https://friendface-api-production.up.railway.app/userChat/byUserId/${userId}`;
    const response = await fetch(url);
    var data = await response.json();
    localStorage.setItem('userMessageNotification', JSON.stringify((data[0].messageNotification).length));
  }
  catch(err){
    console.log(err);
  }
 }

   //get user message Notification count
   export const getMessageNotifCount=()=>{
    const notifCount = localStorage.getItem("userMessageNotification");
    if (notifCount) {
      const count = JSON.parse(notifCount);
      return count;
    }}

    //toggle post form
    export const togglePostForm = ()=>{
      const postForm = document.querySelector('.homeComp-postForm');
      if(postForm.style.display === 'inline'){
          postForm.style.display ='none';
      } else{ 
           postForm.style.display='inline';
          }
  }

export const removeMessageLoader=()=>{
  const loader= document.querySelector('.loader-msg-cont');
  loader.style.display='none';
}


export const toggleLoaderChatRoom=(display)=>{
  const loader=document.querySelector('#loader-dash-chat');
  loader.style.display=display;
}