import React from "react";
import { useState } from "react";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddReunion from "./AddReunion";
const AddReunionAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () =>{
    setSidebarOpen(true);
  };
  const closeSidebar = () =>{
    setSidebarOpen(false);
  };
    return (
      
        
        <div className="containerHome">
        
       
          <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
           <AddReunion/>
           <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
           
        </div>
    
    );
}

export default AddReunionAdmin;