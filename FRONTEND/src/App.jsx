import { useEffect, useState } from "react"

import axios from 'axios';
import Navbar from "./components/navbar";
import Header from "./components/navbar";
import Sidebar from "./components/Sidebar";
import Homevideos from "./components/Home_video_section";
import { Outlet } from "react-router-dom";

function App() {

 
  


  return (

    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
     <Header />
     <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <Sidebar />
     <Outlet />
      </div>
    </div>
    
  )
}

export default App
