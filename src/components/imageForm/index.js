import './style.css';
import { removeAlert,toggleForm, toggleBluredBg } from '../functions';

const ImageForm = (props)=>{

    let currentUser ;
 
    if(!props.currentUser){
      currentUser = { 
        _id : 'not set',
        username : 'not signed in',
        email : 'not available',
      }} else {
        currentUser = props.currentUser;
      }

      const imageSubmitAlert= ()=>{
       /*  const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Profile Image Changed!'
        alertBox.style.display='inline';
        removeAlert(); */

        // temporary image upload maintenance
        alert('Image feature currently unavailable')
        toggleForm('imageForm');
        toggleBluredBg();        
      }
  



    return (
        <div className="profile-image-form">
          {/* changed form to div for maintenance */}
            <div method='POST' action='https://encouraging-pig-cuff-links.cyclic.cloud/images/' enctype="multipart/form-data">
            <input type = "hidden" name = "byUser" value = {currentUser.email} />
            <input type = "hidden" name = "_id" value = {currentUser._id} />
            <label>Update Profile Image</label>         
            <input type='file' name='image'  ></input>
            <button type='submit' id='fileInput'onClick={imageSubmitAlert}>
              Confirm change</button>
            </div>
            <span id='close-box' class="material-symbols-outlined"
             onClick={()=>{toggleForm('imageForm'); toggleBluredBg()}}>
              close
            </span>
        </div>
    )
}

export default ImageForm;