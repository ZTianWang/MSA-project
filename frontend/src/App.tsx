import React from 'react';
import './App.css';
import Login from './features/login';
import { Route, Routes } from 'react-router-dom';
import User from './features/user';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/user' index element={<User />} />
      </Routes>
    </>
  );
}

export default App;
