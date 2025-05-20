import React, { useState } from 'react';

const Balance = ({ balance, onDeposit }) => {
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = (e) => {
    e.preventDefault();
    if (depositAmount > 0) {
      onDeposit(parseFloat(depositAmount));
      setDepositAmount('');
    }
  };

  return (
    <div className="balance">
      <h2>Balance: ${balance}</h2>
      <form onSubmit={handleDeposit} className="deposit-section">
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};

export default Balance;
