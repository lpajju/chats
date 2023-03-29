import React from 'react';
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth,db,storage} from "../firebase";
import {useState}from "react"
import { doc, setDoc} from "firebase/firestore";

import{useNavigate,Link} from "react-router-dom"
import {ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"

const Register = () => {
const[err,setErr]=useState(false)
const navigate= useNavigate()

  const handleSubmit= async (e)=>{
    e.preventDefault()
     const userName =e.target[0].value;
     const email=e.target[1].value;
     const password =e.target[2].value;
     try{
      const res= await createUserWithEmailAndPassword(auth, email, password);

      const storageRef =ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on(
        (error)=>{
          setErr(true);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            await updateProfile(res.user,{
              userName,
              photoURL:downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              userName,
              email,
              photoURL:downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            
          });
        }
      
      )
      }catch(err){
        setErr(true);
      }
    };

 return (
     <div className='formContainer'>
     <div className='formWrapper'>
     <span className="logo">CHAT APP</span>
     <span className="title">Register</span>
     <form onSubmit={handleSubmit}>
     <input type="text"placeholder="username"/>
     <input type="email"placeholder="email"/>
     <input type="password"placeholder="password"/>
     <button>Sign up</button>
     {err && <span>Something went wrong</span>}
     </form>
     <p>You do have an account?<Link to="/login"> Login</Link></p>
      </div>
      </div>
    
    

  );
}
export default Register
