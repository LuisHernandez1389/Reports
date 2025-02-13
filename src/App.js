import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import './App.css';
import Navbar from './components/navbar/navbar';
import Reports from './components/reports/reports';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    
    <Route path='/' element={<Home/>} />
    <Route path='/reports' element={<Reports/>}/>
    

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
