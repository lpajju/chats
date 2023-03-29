import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <div className="Sidebar">
      <Sidebar/>
      </div>
      <div className="Chat">
      <Chat/>
      </div>
      </div>
    </div>
  );
}
export default Home;