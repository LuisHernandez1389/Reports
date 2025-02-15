import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import './App.css';
import Navbar from './components/navbar/navbar';
import Reports from './components/reports/reports';
import Projects from './components/projects/projects';

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
