import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PosterGallery from './PosterGallery'; 
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadForm from './UploadForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/posters" element={<PosterGallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
