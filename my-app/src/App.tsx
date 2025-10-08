import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Layout/Nav';
import ListPage from './pages/ListPage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/pokemon/:name" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
