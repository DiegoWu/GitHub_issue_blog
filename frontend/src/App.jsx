import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import ListPage from './components/ListPage';
import ContentPage from './components/ContentPage';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Routes */}
        <Route path="/" element={<ListPage />} /> {/* Use element prop instead of component */}
        <Route path="/post/:id" element={<ContentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
