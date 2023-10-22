import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
export default function NavBar() {
    
    const location = useLocation();

   
    return (

        <nav className={`bg-blue-500 p-4 ${location.pathname === "/main"  && "hidden"}`}>
          <div className="container mx-auto flex justify-between items-center">
            {/* <Link to="/" className={`text-white text-lg font-semibold `}>
              My App
            </Link> */}
            <div className="flex space-x-4">
              <Link to="/client" className={`text-white ${location.pathname === "/client" && "underline font-bold"}`}>
                Dispensing
              </Link>
              <Link to="/main" className={`text-white ${location.pathname === "/main" && "underline font-bold"}`}>
                Main
              </Link>
              <Link to="/window" className={`text-white ${location.pathname === "/window" && "underline font-bold"}`}>
                Window
              </Link>
              <Link to="/faculty" className={`text-white ${location.pathname === "/faculty" && "underline font-bold"}`}>
                Faculty
              </Link>
            </div>
          </div>
         
        </nav>


    );
}