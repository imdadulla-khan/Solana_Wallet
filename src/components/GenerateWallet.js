import React from "react";
import "./GenerateWallet.css";
import { useState } from "react";

const GenerateWallet = ({ generateNewWallet, wallets }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(null);

  const togglePrivateKey = (index) => {
    setShowPrivateKey(showPrivateKey === index ? null : index);
  };
  return (
    <div className="generate-wallet-container">
      <button onClick={generateNewWallet}>Generate New Wallet</button>
      {wallets.map((wallet, index) => (
        <div key={index} className="wallet">
          <h2>Wallet {index + 1}</h2>
          <p>Public Key: {wallet.publicKey}</p>
          <p>
            Private Key:{" "}
            {showPrivateKey === index ? wallet.privateKey.join(",") : "*****"}
          </p>
          <button onClick={() => togglePrivateKey(index)}>
            {showPrivateKey === index ? "Hide" : "Show"} Private Key
          </button>
        </div>
      ))}
    </div>
  );
};

export default GenerateWallet;
