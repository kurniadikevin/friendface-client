import axios from 'axios';

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

export const refreshLoginSession=(user)=>{
  const lastPassword= localStorage.getItem('lastPassword');
  axios({
    method: "POST",
    data: {
      email: user.email,
      password: lastPassword,
    },
    withCredentials: true,
    url: "https://odin-book-api-production.up.railway.app/users/login",
  }).then((res) => {
    if(res.data === 'No User Exists'){
      alert('No User Exist');
    } else{
      localStorage.setItem("user", JSON.stringify(res.data));
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