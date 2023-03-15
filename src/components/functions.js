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
    url: "http://localhost:5000/users/login",
  }).then((res) => {
    if(res.data === 'No User Exists'){
      alert('No User Exist');
    } else{
      localStorage.setItem("user", JSON.stringify(res.data));
    }    
  });
}