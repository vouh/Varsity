import React, { useState, useEffect } from 'react';
import BetList from './components/BetList';
import BetHistory from './components/BetHistory';
import Balance from './components/Balance';
import './App.css';

function App() {
  const [balance, setBalance] = useState(3433);
  const [activePage, setActivePage] = useState('home');
  const [showConfetti, setShowConfetti] = useState(false);
  const [bets, setBets] = useState([
    { id: 1, title: 'Red Sox vs Yankees', odd: 1.5, sport: 'Baseball' },
    { id: 2, title: 'Lakers vs Bulls', odd: 2.0, sport: 'Basketball' },
    { id: 3, title: 'Liverpool vs Arsenal', odd: 1.8, sport: 'Soccer' },
    { id: 4, title: 'Patriots vs Rams', odd: 2.2, sport: 'Football' },
    { id: 5, title: 'Federer vs Nadal', odd: 1.7, sport: 'Tennis' },
  ]);
  const [betHistory, setBetHistory] = useState([]);
  
  useEffect(() => {
    // Show confetti animation on initial load
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const placeBet = (bet) => {
    if (balance <= 0) {
      alert('Insufficient balance');
      return;
    }

    const amount = prompt('Enter bet amount:');
    if (!amount || amount <= 0 || amount > balance) {
      alert('Invalid amount');
      return;
    }

    const newBet = {
      ...bet,
      amount: parseFloat(amount),
      timestamp: new Date().toISOString(),
      status: Math.random() > 0.5 ? 'won' : 'lost'
    };

    setBetHistory([...betHistory, newBet]);
    
    if (newBet.status === 'won') {
      const winnings = parseFloat(amount) * bet.odd;
      setBalance(balance - parseFloat(amount) + winnings);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setBalance(balance - parseFloat(amount));
    }
  };

  const deposit = (amount) => {
    if (amount > 0) {
      setBalance(balance + amount);
    }
  };

  const renderContent = () => {
    switch(activePage) {
      case 'home':
        return (
          <main className="app-content">
            <Balance balance={balance} onDeposit={deposit} />
            <BetList bets={bets} onPlaceBet={placeBet} />
            <BetHistory history={betHistory} />
          </main>
        );
      case 'sports':
        return (
          <div className="sports-page">
            <h2>Top Sports</h2>
            <div className="sports-grid">
              {['Baseball', 'Basketball', 'Soccer', 'Football', 'Tennis'].map(sport => (
                <div key={sport} className="sport-card">
                  <h3>{sport}</h3>
                  <p>Popular in betting</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="profile-page">
            <h2>User Profile</h2>
            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-placeholder"></div>
              </div>
              <div className="profile-details">
                <h3>John Williams</h3>
                <p>Member since: Jan 2025</p>
                <p>Total bets: {betHistory.length}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {showConfetti && <div className="confetti-container">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#FFD700', '#B8860B', '#ffffff', '#1a1a1a'][Math.floor(Math.random() * 4)]
            }}
          ></div>
        ))}
      </div>}
      
      <header className="App-header">
        <div className="logo-container">
          <h1>BET KING</h1>
          <span className="crown-icon">👑</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li className={activePage === 'home' ? 'active' : ''}>
              <button onClick={() => setActivePage('home')}>Home</button>
            </li>
            <li className={activePage === 'sports' ? 'active' : ''}>
              <button onClick={() => setActivePage('sports')}>Sports</button>
            </li>
            <li className={activePage === 'profile' ? 'active' : ''}>
              <button onClick={() => setActivePage('profile')}>Profile</button>
            </li>
          </ul>
        </nav>
      </header>
      
      {renderContent()}
      
      <div className="stats-banner">
        <div className="stat-item">
          <span className="stat-value">11,443</span>
          <span className="stat-label">Active Bets</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">$3,223.55</span>
          <span className="stat-label">Total Profit</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">38%</span>
          <span className="stat-label">Win Rate</span>
        </div>
      </div>
    </div>
  );
}

export default App;
