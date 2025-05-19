import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== '') {
      navigate(`/stock/${input.toUpperCase()}`);
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Search for a Stock</h1>
      <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., AAPL)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;