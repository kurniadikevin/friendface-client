import './style.css';

function HomeComp(){
    return (
        <div className='HomeComp'> 
            <div className='home-head'>
                <button id='make-post'>Make post</button>
            </div>
            <div className='search-bar'>
                <input type='text' id='search-input'></input>
                <div>
                <span class="material-symbols-outlined">search</span>
                </div>
            </div>
        </div>
    )
}

export default HomeComp;