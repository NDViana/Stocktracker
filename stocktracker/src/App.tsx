import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import StockPage from './StockPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/stock/:symbol" element={<StockPage />} />
      </Routes>
    </Router>
  );
};

export default App;
