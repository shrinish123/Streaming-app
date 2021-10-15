import React from 'react'
import './livestream.css';


function LiveStream({thumbnail,profilePicUrl,title,name}) {
    return (
        <>
        <div className='stream__Container'>
            <div className="img__container">
                <img className='thumbnail' src={thumbnail} alt="stream Thumbnail" />
            </div>
            <div className="user__banner">
                <div className="pic__container">
                    <img className="pic" src={profilePicUrl} alt="Streamer ProfilePic" />
                </div>
                <div className="user__info">
                    <div className="title">{title}</div>
                    <div className="name">{name}</div>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default LiveStream