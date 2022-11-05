import './style.css';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard';
import Sidebar from '../../components/sidebar/sidebar';
import HomeComp from '../../components/homecomp';
import { useState, useEffect } from 'react';


export function HomePage() {

  const [postData,setPostData]=useState([])

  const url='http://localhost:5000/posts';

  const fetchPostData = async ()=>{
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    setPostData(data);
    }


    
    useEffect(()=>{
      fetchPostData();
    },[])

  return (
    <div className="App">
      <Dashboard/>
      
      <div className='main'  id='home-page'>
        <HomeComp/>
        <div className='displayPostCont'>
          {postData.map(function(item,index){
            return(
              <div>
                <div className='post-text'>{item.text}</div>
                <div className='post-author'>{item.author}</div>
              </div>
            )
          })}
        </div>

      </div>
      
      <Sidebar/>
    </div>
  );
}
