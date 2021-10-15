import React from 'react';
import './comment.css';

function ChatComment({message}) {




    return (
        <>
        <div className='comment__container'>
          <div className="img__container">
            <img  className='image' src={message.profilePicUrl} alt="userimage" />
            </div>
            <div className="comment__messageBox">
              <div className="comment__timeStamp">07:50 AM</div>
              <div className="comment__name">{message.name}</div>
              <div className="comment__message">{message.messageString}</div>
            </div>
        </div>
        </>
    )
}

export default ChatComment;
