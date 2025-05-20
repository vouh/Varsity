import React from 'react';

const BetHistory = ({ history }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bet-history">
      <h2>Bet History</h2>
      {history.length === 0 ? (
        <div className="empty-history">
          <p>No bets placed yet</p>
        </div>
      ) : (
        <div className="history-container">
          {history.map((bet, index) => (
            <div key={index} className="history-item">
              <span className="sport-tag">{bet.sport}</span>
              <h3>{bet.title}</h3>
              <p>Amount: <span className="amount">${bet.amount}</span></p>
              <p>Potential Win: <span className="potential-win">${(bet.amount * bet.odd).toFixed(2)}</span></p>
              <p>Date: {formatDate(bet.timestamp)}</p>
              <p>Status: <span className={`status ${bet.status}`}>{bet.status.toUpperCase()}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BetHistory;
