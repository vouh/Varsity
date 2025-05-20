import React from 'react';

const BetList = ({ bets, onPlaceBet }) => {
  return (
    <div className="bet-list">
      <h2>Available Bets</h2>
      <div className="bets-container">
        {bets.map((bet) => (
          <div key={bet.id} className="bet-item">
            <span className="sport-tag">{bet.sport}</span>
            <h3>{bet.title}</h3>
            <p className="odd">Odd: {bet.odd}</p>
            <button onClick={() => onPlaceBet(bet)}>Place Bet</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetList;
