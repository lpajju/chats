import React from 'react'
//import Login from './pages/Login';

//import Sidebar from './components/Sidebar'
//import Chat from './componenets/Chat'
//import { render } from "react-dom";
//import "./style.scss"
   import Home from './pages/Home'
   import Login from './pages/Login'
    import {BrowserRouter, Routes,Route,Navigate} from "react-router-dom";
   import  Register from './pages/Register'
   import {useContext} from "react";
   import {AuthContext} from './context/AuthContext'
  
    function App(){
     const {currentUser}=useContext(AuthContext)
      const ProtectedRoute=({children})=>{
        if(!currentUser){
          return <Navigate to="/login"/>;
        }
        return children
      };

        return (

     <BrowserRouter>
       <Routes>
         <Route path="/">
          <Route 
            index 
            element= {
              <ProtectedRoute>
                <Home/>
             </ProtectedRoute>
          } 
        />
      <Route path="Login"element={<Login/>} />
      <Route path="Register" element={<Register/>} />
      </Route>
       </Routes>
       </BrowserRouter>
         );
}
export default App;