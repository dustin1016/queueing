import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Client from './pages/Client';
import Dashboard from './pages/Dashboard';
import Window from './pages/Window';
import NavBar from './Nav';
import Faculty from './pages/Faculty';
function App() {
 
 
  return (
    <div>
   
       <div className="App">
     
      <Router>

      <NavBar />
        <Routes>

          <Route path="/" element={<Client />} />
          
          <Route path="/client" element={<Client />}>

          </Route>
          <Route path="/main" element={<Dashboard />}>
           
          </Route>
          <Route path="/window" element={<Window />}>
           
          </Route>
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      
      </Router>
    </div>
    </div>
  );
}

export default App;
