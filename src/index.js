import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Layout';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Editor from './Editor';
import Note from './Note';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<Layout />}>
          <Route path="/notes/:noteId/edit" element={<Editor />} />
          <Route path="/notes/:noteId" element={<Note />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
