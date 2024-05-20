import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Tos from './components/pages/Tos';
import './components/styles/App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tos' element={<Tos />} />
      </Routes>
      <Toaster />
      {/* <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button> */}
    </>
  );
}

export default App;
