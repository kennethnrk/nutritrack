import React from 'react';
import "./App.css"
import Navibar from "./components/Navibar";
import { Route,Routes, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
    const location = useLocation();
  return (
      <>
        <Navibar/>
          <div style={{marginTop:'15vh'}}>
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
          </div>

      </>

  );
}

export default App;
