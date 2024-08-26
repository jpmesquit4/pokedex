import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Home from './pages/home'
import NotFound from './pages/notfound';
import InfoPokemons from './pages/infoPokemons';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/pokemon/info/:idParam' element={<InfoPokemons/> }/>
        <Route path='/404' element={<NotFound/> }/>
        <Route path='*' element={<Navigate to='/404'/> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


