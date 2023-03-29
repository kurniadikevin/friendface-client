import './style.css';
import { refreshLoginSession } from '../functions';
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
        const alertBox = document.querySelector('#alert-box');
        alertBox.textContent='Profile Image Changed!'
        alertBox.style.display='inline';
        removeAlert();
      }
  



    return (
        <div className="profile-image-form">
            <form method='POST' action='https://odin-book-api-production.up.railway.app/images/' enctype="multipart/form-data">
            <input type = "hidden" name = "byUser" value = {currentUser.email} />
            <input type = "hidden" name = "_id" value = {currentUser._id} />
            <label>Update Profile Image</label>         
            <input type='file' name='image'  ></input>
            <button type='submit' id='fileInput'onClick={imageSubmitAlert}>
              Confirm change</button>
            </form>
            <span id='close-box' class="material-symbols-outlined"
             onClick={()=>{toggleForm('imageForm'); toggleBluredBg()}}>
              close
            </span>
        </div>
    )
}

export default ImageForm;