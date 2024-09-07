import React from "react";
import "./checkBalance.css";

const CheckBalance = ({
  balanceWallet,
  setBalanceWallet,
  checkBalance,
  balance,
}) => {
  return (
    <div className="check-balance-container">
      <h2>Check Wallet Balance</h2>
      <input
        type="text"
        placeholder="Enter Wallet Public Key"
        value={balanceWallet}
        onChange={(e) => setBalanceWallet(e.target.value)}
      />
      <button onClick={checkBalance}>Check Balance</button>
      <p>Balance: {balance} SOL</p>
    </div>
  );
};

export default CheckBalance;
