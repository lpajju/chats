import React, {useState,useContext} from 'react'
import { collection, query, where ,getDoc,serverTimestamp,updateDoc,doc,setDoc} from "firebase/firestore";
import {db} from "../firebase"
import {AuthContext} from "../context/AuthContext"

const Search = () => {
  const [username,setusername]=useState("")
  const [user,setuser]=useState(null)
  const [err,setErr]=useState(false)

  const{currentUser}=useContext(AuthContext)
  const handleSearch= async ()=>{
    const q= query (
      collection(db,"users"),
      where("userName", "==", username)
      
    );
    try{

    
    const querySnapshot= await getDoc(q);
    querySnapshot.forEach((doc)=>{
    setuser(doc.data())
    });
    }catch(err){
      setErr(true);
    }
  }
  const handleKey =(e)=>{
  e.code ==="Enter"&& handleSearch();
    

    };
const handleSelect=async ()=>{
const combinedId= currentUser.uid >user.uid
 ?currentUser.uid+user.uid
 :user.uid+currentUser.uid;
 try{
  const res= await getDoc(doc(db,"chats",combinedId));
  if(!res.exists()){
  await setDoc(doc(db,"chats",combinedId),{messages:[]});

  await updateDoc(doc(db,"usercahts",currentUser.uid),{
    [combinedId+".userInfo"]:{
      uid:user.uid,
      userName:user.userName,
      photoURL: user.photURL
    },
    [combinedId+"date"]:serverTimestamp()
  });
  await updateDoc(doc(db,"usercahts",user.uid),{
    [combinedId+".userInfo"]:{
      uid:currentUser.uid,
      userName:currentUser.userName,
      photoURL: currentUser.photURL
    },
    [combinedId+"date"]:serverTimestamp()
  });



  }

 }catch(err){} 
 setuser(null);
 setusername("")
} ;

  
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' 
        onKeyDown={handleKey} 
        onChange={(e)=>setusername(e.target.value)}
        value={username}
        />

      </div>
      {err && <span>User not found!</span>}

       {user &&<div className="userchat"onClick={handleSelect}>
        <img 
        src={user.photoURL}
         alt=""
         />
      <div className="userChatInfo"></div>
      <span>{user.userName}</span>
      </div>  }    
      </div>  
      
)
  }
export default Search;
