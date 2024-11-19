// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostCreate from './post/PostCreate';
import PostList from './post/PostList';
import PostDetail from './post/PostDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/post" element={<PostList />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
