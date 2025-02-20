import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.js';
import './App.css';
import Navbar from './components/navbar/navbar.js';
import Reports from './components/reports/reports.js';
import Projects from './components/projects/projects.js';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    
    <Route path='/' element={<Home/>} />
    <Route path='/reports' element={<Reports/>}/>
    <Route path='/projects' element={<Projects/>} />

    

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
