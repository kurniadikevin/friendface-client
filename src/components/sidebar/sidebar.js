import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';



function Sidebar(){

    const [data,setData]= useState([]);

    const fetchUserList =()=>{
       const recentUser = localStorage.getItem('userPopular');
       if(recentUser){
        const foundUser = JSON.parse(recentUser);
        setData(foundUser);
       }

    }

    useEffect(()=>{
        fetchUserList();
    },[])

    return(
        <div id='sidebar-wrapper'>
        <div className='Sidebar'>
            <div className='sidebar-head'>Popular user </div>     
            <div className='sidebar-main'>
                {data.map((data)=>{
                    return(
                        <div className='display-user'>
                         <div className='display-user-col1'>
                         <img  id='profileImg' src={data?.profilePicture ?  `https://encouraging-pig-cuff-links.cyclic.cloud/${data.profilePicture} `
                            : (require('../../assets/profilepicturesSmall.png'))}
                            alt='displayUser-profileImage' width={30} height={30}/> 
                         </div>
                        <div className='display-user-col2'>
                            <Link to={`/userProfile/${data?._id}`}  
                             id='link-user-sidebar' >
                                <div className='display-username'>
                                    {data.username}
                                </div>
                            </Link>
                            <Link to={`/userProfile/${data?._id}`}  
                             id='link-user-sidebar' >
                            <div className='display-email'>
                                {data.email}
                            </div>
                            </Link>
                        </div>
                        </div>
                        
                    )
                })}    
            </div>   
            
            <div className='sidebar-bottom'>
              
                <div className='desc1'>Theme inspired by Dracula theme</div>
                <div className='desc2'>'Friendface' name inspired by</div>
                <div className='desc2'> the IT Crowd series</div>
                <div className='desc3'>
                    <div>WebApp by kurniadikevin</div>
                    <a href='https://github.com/kurniadikevin'>
                     <i class="fa fa-github" id='github-logo'></i>
                    </a>
              
                </div>  
            </div>
            </div>
        </div>
       
        
    )
}

export default Sidebar;
