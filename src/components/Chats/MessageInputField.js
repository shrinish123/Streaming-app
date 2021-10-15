import React, { useState } from "react";
import './chat.css';
import {IoMdSend} from 'react-icons/io'

function MessageInputField({ sendMsg }) {
  const [text, setText] = useState("");

  return (
    <div style={{ position: "sticky", bottom: "0" }}>
        <form
         className='form__container'
          reply
          onSubmit={e => {
            e.preventDefault();
            sendMsg(text);
            setText("");
          }}
        >
          <input 
            className='inputBox'
            placeholder="Say Something"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className='submitBtn' disabled={text ===''}><IoMdSend/></button>
        </form>
    </div>
  );
}

export default MessageInputField;
