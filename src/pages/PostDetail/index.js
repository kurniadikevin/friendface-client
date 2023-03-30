import './style.css';
import Dashboard from '../../components/dashboard/dashboard';
import { DisplayPost } from '../../components/displayPost';
import HomeComp from '../../components/homecomp';
import {  useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import { getUser } from '../../components/functions';

export const PostDetail=()=>{  
   let currentUser= getUser();

   let {postId} = useParams(); 

    return(
        <div className='App'>
            <Dashboard dashIndex={0} />
            <div className='main'  id='home-page'>
                <HomeComp currentUser={currentUser}/>
                <DisplayPost currentUser={currentUser} urlExtension={`postDetail/${postId}/`} singlePost={true} 
               />
            </div>
            <Sidebar/>
        </div>
    )
}