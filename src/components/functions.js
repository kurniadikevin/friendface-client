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

export const displayDateDifferences=(value)=>{
  let difference=(Date.now() - value)/60000;
  let result= Math.floor(difference);
  if(result< 60){
    return `${result} Minutes ago`;
  } else if( result >= 60 && result < 1440){
    const resultHour = Math.floor(result/60);
    return `${resultHour} Hours ago`;
  } else if( result >= 1440 ){
    const resultDay = Math.floor(result/1440);
    return `${resultDay} Days ago`;
  }
  
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
    url: "http://localhost:5000/users/login",
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

// universal toggle for form using id name of the form as parameter
export const toggleForm = (form)=>{
  const Form = document.querySelector(`#${form}`);
  if(Form.style.display === 'inline'){
      Form.style.display ='none';
  } else{  Form.style.display='inline'}
}

//toggle blurred background
export const toggleBluredBg=()=>{
  const blurredBg= document.querySelector('.blurred-bg');
  if(blurredBg.style.display === 'inline'){
      blurredBg.style.display ='none';
  } else{ 
       blurredBg.style.display='inline';
      }
}
