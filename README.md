# Stock Tracker

**Stock Tracker** is a sleek web application that simplifies stock analysis by providing real-time trends, historical data, and performance insights — all presented through a clean and intuitive interface.

## Features

- **Search stocks** and get instant performance metrics
- **Real-time updates** for stock price, change, and volume
- View **daily highs/lows, previous close, and historical data**
- Built with a responsive and clean UI for a great user experience

## Tech Stack

- **Frontend**: React, TypeScript, CSS
- **Backend**: Flask (Python)
- **Other**: REST APIs for real-time stock data (e.g., Alpha Vantage, Yahoo Finance, or similar)

## Getting Started

### Prerequisites

- Node.js + npm
- Python 3.x + `pip`
- A stock market API key (e.g., Alpha Vantage or Finnhub)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/NDViana/Stocktracker.git
cd Stocktracker
```
#### 2. Set up the Backend
```bash
cd Backend
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate   # On macOS/Linux
pip install -r requirements.txt
python app.py
```
#### 3. Setup the frontend
```bash
cd ../stocktracker
npm install
npm run dev
```
