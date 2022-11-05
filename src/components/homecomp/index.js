import './style.css';

function HomeComp(){

    const togglePostForm = ()=>{
        const postForm = document.querySelector('.homeComp-postForm');
        if(postForm.style.display === 'inline'){
            postForm.style.display ='none';
        } else{  postForm.style.display='inline'}
    }

    return (
        <div className='HomeComp'>
            <div className='HomeCompHead'>
                <div className='home-head'>
                    <button id='make-post' onClick={togglePostForm}>Make post</button>
                </div>
                <div className='search-bar'>
                    <input type='text' id='search-input'></input>
                    <div>
                    <span class="material-symbols-outlined">search</span>
                    </div>
                </div>
            </div>
            <div className='homeComp-postForm'>
                <form className='newpost-form' method='POST' action="http://localhost:5000/posts/newpost">
                    <div className='newpost-main'>
                        <textarea id='newpost-text' name='text'></textarea>
                    </div>
                    <div className='newpost-button'>
                        <button id='newpost-submit' type='submit'>Post</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default HomeComp;