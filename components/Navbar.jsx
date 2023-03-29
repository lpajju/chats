import React,{useContext} from 'react'
import {signOut} from "firebase/auth"
import {auth} from '../firebase'
import {AuthContext} from '../context/AuthContext'
const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className='Navbar'>
      <span className="logo">CHAT APP</span>
      <div className="user">
        <img src={currentUser.photoURL}alt=""/>
        
        
        <span>{currentUser.userName}</span>


        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
      </div>
  )
}

export default Navbar