import { useState } from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import ProfileAndChatbot from './Components/Profile/ProfileAndChatbot';

function App() {

  return (
      <>
      <div className='App'>
        <Navbar/>
        <ProfileAndChatbot/>
      </div>
      </>
    
  )
}

export default App
