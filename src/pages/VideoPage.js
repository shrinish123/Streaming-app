import React,{useState,useEffect} from 'react'
import VideoPlayer from '../components/LiveStreams/VideoPlayer';
import  { useParams} from 'react-router-dom';
import Chat from '../components/Chats/Chat';
import axios from 'axios';
import baseUrl from '../utils/baseUrl'
import cookie from 'js-cookie';
import '../components/LiveStreams/videopage.css';
 

function VideoPage() {

    const [user, setUser] = useState({});

    useEffect(() => {
      const getLoggedUser = async () => {
        const res = await axios.get(`${baseUrl}/api/auth`, {
          headers: { Authorization: cookie.get("token") },
        });
        setUser(res.data.user);
      };
      getLoggedUser();
    }, []);

    const params = useParams();
    const {username} = params;

    

  



    return (
        <>
        <div className='video__main'>
           
            <VideoPlayer  username={username} className='stream__main'/>
            <Chat user={user} room ={username} className='chat__main'/>
        </div>
        </>
    )
}

export default VideoPage
