import React,{useContext} from 'react';
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";

         
function Chat() {
  const {data}=useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInFo">
          <span>{data.user?.userName}</span>
      </div>
     <Messages/>
     <Input/>
   </div>

   )
}
export default Chat
