import React from "react";
import "./Airdrop.css";

const AirdropSol = ({
  airdropWallet,
  setAirdropWallet,
  airdropAmount,
  setAirdropAmount,
  airdropSol,
}) => {
  return (
    <div className="airdrop-sol-container">
      <h2>Airdrop SOL to Wallet</h2>
      <input
        type="text"
        placeholder="Enter Recepient's Wallet Public Key"
        value={airdropWallet}
        onChange={(e) => setAirdropWallet(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount of SOL"
        value={airdropAmount}
        onChange={(e) => setAirdropAmount(Number(e.target.value))}
      />
      <button onClick={airdropSol}>Airdrop SOL</button>
    </div>
  );
};

export default AirdropSol;
