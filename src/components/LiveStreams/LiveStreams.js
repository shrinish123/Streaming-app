import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import mediaUrl from '../../utils/mediaUrl';
import baseUrl  from '../../utils/baseUrl';
import LiveStream from './LiveStream';
import './videopage.css';


function LiveStreams() {

   const [liveStreamsUsers,setLiveStreamsUsers] = useState([]);
   const [error,setError]= useState(true);

   useEffect(() => {

    const getUsersInfo=async(live)=>{

        try {
            const res = await axios.get(`${baseUrl}/api/streams`,{
                params:{
                    live:live
                }
            });
            setLiveStreamsUsers(res.data);
            setError(false);
            
        } catch (error) {
            console.log(error);
            setError(true);
        }
         
        
    }
       
    const getLiveStreams=async()=>{

        try {

            const res = await axios.get(`${mediaUrl}/api/streams`);
            await getUsersInfo(res.data.live);
            
         
        } catch (error) {
            console.log(error);
            setError(true);
        }
    
    }
       getLiveStreams();
   }, [])

   console.log(liveStreamsUsers)

    return (
        <>
        {error ? (
            <>
            <div className='emptyState'>
                No Ones Streaming
            </div>
            </>
        ) : (
            <>
            {liveStreamsUsers.map((stream,index) => {
                return (
                    <div key={index}>
                        <Link to={'/stream/' + stream.user.username}>
                          <LiveStream thumbnail={stream.thumbnail} profilePicUrl={stream.user.profilePicUrl} title={stream.title} name={stream.user.name}/>
                        </Link>
                    </div>
                )
            })}
            </>
        ) }
        
            
        </>
    )
}

export default LiveStreams
