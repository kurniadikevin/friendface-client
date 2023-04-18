import { togglePostForm } from '../functions';
import './style.css';

const NewPostMobile=()=>{
    return(
        <div  id='new-post-mobile' onClick={togglePostForm}>
            <span id='np-mobile-icon' class="material-symbols-outlined">
            draw
            </span>
        </div>
    )
}

export default NewPostMobile;