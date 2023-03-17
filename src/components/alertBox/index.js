import './style.css';

 const AlertBox=()=>{

    const removeAlert=()=>{
        const alertBox = document.querySelector('#alert-box');
        alertBox.style.display='none';
      }

    return (
        <div id='alert-box' onClick={removeAlert}>
                <div id='alert-content'>
                <span id='link-icon' class="material-symbols-outlined">notifications_active</span>
                <div id='alert-msg'>test message</div>
                </div>
            </div>
 )
}

export default AlertBox;

