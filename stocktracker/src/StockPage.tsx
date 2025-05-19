import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './StockPage.css';

type StockParams = {
  symbol: string;
};

type StockQuote = {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
};

type StockData = {
  "Global Quote": StockQuote;
};

const StockPage: React.FC = () => {
  const { symbol } = useParams<StockParams>();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stock?symbol=${symbol}`);
      setStockData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data', error);
      setError('Failed to load stock data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol]);

  // Format large numbers with commas
  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  // Format currency values
  const formatCurrency = (num: string) => {
    return parseFloat(num).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  };

  // Determine if change is positive or negative for styling
  const getChangeClass = (change: string) => {
    return parseFloat(change) >= 0 ? 'positive-change' : 'negative-change';
  };

  return (
    <div className="stock-page-container">
      <div className="home-button">
        <button onClick={() => navigate('/')}>Back to Search</button>
      </div>
      
      <div className="stock-content">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading stock data...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : stockData && stockData["Global Quote"] ? (
          <div className="stock-card">
            <div className="stock-header">
              <h1>{stockData["Global Quote"]["01. symbol"]}</h1>
              <div className="latest-price">
                <span className="price">{formatCurrency(stockData["Global Quote"]["05. price"])}</span>
                <span className={`change ${getChangeClass(stockData["Global Quote"]["09. change"])}`}>
                  {parseFloat(stockData["Global Quote"]["09. change"]) >= 0 ? '▲' : '▼'} 
                  {stockData["Global Quote"]["09. change"]} 
                  ({stockData["Global Quote"]["10. change percent"]})
                </span>
              </div>
              <p className="trading-day">Last updated: {stockData["Global Quote"]["07. latest trading day"]}</p>
            </div>
            
            <div className="stock-details">
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Open</span>
                  <span className="detail-value">{formatCurrency(stockData["Global Quote"]["02. open"])}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Previous Close</span>
                  <span className="detail-value">{formatCurrency(stockData["Global Quote"]["08. previous close"])}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Daily High</span>
                  <span className="detail-value">{formatCurrency(stockData["Global Quote"]["03. high"])}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Daily Low</span>
                  <span className="detail-value">{formatCurrency(stockData["Global Quote"]["04. low"])}</span>
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-item full-width">
                  <span className="detail-label">Volume</span>
                  <span className="detail-value">{formatNumber(stockData["Global Quote"]["06. volume"])}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data">No stock data available for {symbol}</div>
        )}
      </div>
    </div>
  );
};

export default StockPage;