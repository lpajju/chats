import React, { useState,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { storage,db} from '../firebase';
import { v4 as uuid } from 'uuid';
import { arrayUnion,doc,updateDoc,Timestamp} from 'firebase/firestore';
import { uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage';



const Input = () => {
  const [text,setText]=useState("");
  const[img,setImg]=useState(null);

  const {data}= useContext(ChatContext);
  const {currentUser}= useContext(AuthContext);
  const handleSend=async()=>
  
  {
    if(img){
      const storageRef =ref(storage,uuid ());
      const uploadTask=uploadBytesResumable(storageRef,img);
      uploadTask.on(
        (error)=>{
          //SetError(true);
        },
        ()=>{
      
      getDownloadURL(uploadTask.snapshot.ref).then (async(downloadURL)=>{
        await updateDoc(doc(db,"chats",data.chatId),{
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: {Timestamp}.now,
            img:downloadURL,
        }),
       });
      })
      }
      )
    }else {
          await updateDoc(doc(db,"chats",data.chatId),{
            messages: arrayUnion({
              id:uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),




            }),
          });
        }
      }
           await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId + ".lastMessage"]:{
              text,
    },      [data.chatId+".date"]:serverTimestamp()
        });
         await updateDoc(doc(db,"userChats",data.user.uid),{
          [data.chatId + ".lastMessage"]:{
            text,
     },
     [data.chatId+".date"]:serverTimestamp()
         });
 
        
    setText("")
    setImg(null)
  
  return (
    <div className='input'>
      <input type="text"placeholder='Type something......' 
      onChange={e=>setText(e.target.value)}
      value={text}
      />
      <div className="send">
        
        <input type="file"style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
        <img src={"Img"} alt=""/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
export default Input