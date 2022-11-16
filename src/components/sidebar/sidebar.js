import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';



function Sidebar(){

    const [data,setData]= useState([]);

    const fetchUserList =()=>{
        let url='http://localhost:5000/users/recent';
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setData(data)
        });

    }

    useEffect(()=>{
        fetchUserList()
    },[])

    return(
        <div>
        <div className='Sidebar'>
            <div className='sidebar-head'>Popular user </div>     
            <div className='sidebar-main'>
                {data.map((data)=>{
                    return(
                        <div className='display-user'>
                         <div className='display-user-col1'>
                         <img  id='profileImg' src={data?.profilePicture ?  `http://localhost:5000/${data.profilePicture} `
                            : (require('../../assets/profilepicturesSmall.png'))}
                            alt='displayUser-profileImage' width={30} height={30}/> 
                         </div>
                        <div className='display-user-col2'>
                            <Link to={`/userProfile/${data?._id}`} id='link-user-sidebar' >
                                <div className='display-username'>
                                    {data.username}
                                </div>
                            </Link>
                            <div className='display-email'>
                                {data.email}
                            </div>
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
