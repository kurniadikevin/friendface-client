export const formatDate= (value)=>{
    let arrMonths=[null,'Jan','Feb', 'Mar','Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
          let valueStr = value.toString()
        let split = valueStr.split('T');// split error
        let splitYMD= split[0].split('-');
        let displayDate = `${arrMonths[splitYMD[1]]} ${splitYMD[2]}`
        return displayDate;
      }
  
export const formatTimeStamp = (value)=>{
    let date = new Date(value);
     let stringDate =JSON.stringify( date);
   return formatDate(stringDate);
  }
  