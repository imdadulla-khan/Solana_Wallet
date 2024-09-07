import React, { useState } from "react";
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { generateMnemonic } from "bip39";
import GenerateWallet from "./components/GenerateWallet";
import AirdropSol from "./components/AirdropSol";
import CheckBalance from "./components/checkBalance";
import { derivePath } from "ed25519-hd-key"; // For deriving keys from mnemonic
import { mnemonicToSeedSync } from "bip39"; // For generating a seed from mnemonic
import "./App.css"; // Main app CSS file

window.Buffer = window.Buffer || Buffer;

const App = () => {
  const [wallets, setWallets] = useState([]);
  const [balance, setBalance] = useState(0);
  const [airdropAmount, setAirdropAmount] = useState(1);
  const [balanceWallet, setBalanceWallet] = useState("");
  const [airdropWallet, setAirdropWallet] = useState("");
  const [mnemonic, setMnemonic] = useState("");

  const generateNewWallet = () => {
    try {
      // Check if a mnemonic is already stored
      let newMnemonic = mnemonic;

      // If no mnemonic exists, generate a new one
      if (!newMnemonic) {
        newMnemonic = generateMnemonic(); // Generate a new mnemonic if none exists
        setMnemonic(newMnemonic); // Store the mnemonic in state
      }

      // Derive a seed from the mnemonic
      const seed = mnemonicToSeedSync(newMnemonic);

      // Derive a keypair from the seed (using m/44'/501'/0'/0 path for Solana)
      const derivedSeed = derivePath(
        "m/44'/501'/0'/0'",
        seed.toString("hex")
      ).key;
      const newKeypair = Keypair.fromSeed(derivedSeed);

      // Create the wallet object
      const newWallet = {
        mnemonic: newMnemonic, // Use the same mnemonic
        publicKey: newKeypair.publicKey.toString(),
        privateKey: Array.from(newKeypair.secretKey),
      };

      // Update the wallets list with the new wallet
      setWallets([...wallets, newWallet]);
    } catch (error) {
      console.error("Error generating wallet from mnemonic:", error);
    }
  };

  // Function to check balance of any wallet
  const checkBalance = async () => {
    try {
      const connection = new Connection(
        "https://solana-devnet.g.alchemy.com/v2/ldRefsyS8DGVp5Ad80CFlyoUm15kiEFu",
        "confirmed"
      );
      const walletBalance = await connection.getBalance(
        new PublicKey(balanceWallet)
      );
      setBalance(walletBalance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      console.log(balance);
    } catch (error) {
      console.error("Error checking balance:", error);
      setBalance(null);
    }
  };

  // Function to airdrop SOL to any wallet
  const airdropSol = async () => {
    try {
      const connection = new Connection(
        "https://solana-devnet.g.alchemy.com/v2/ldRefsyS8DGVp5Ad80CFlyoUm15kiEFu",
        "confirmed"
      );
      const airdropSignature = await connection.requestAirdrop(
        new PublicKey(airdropWallet),
        airdropAmount * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
      console.log(`Airdropped ${airdropAmount} SOL to ${airdropWallet}`);
    } catch (error) {
      console.error("Error airdropping SOL:", error);
    }
  };

  return (
    <div className="scrollable-container">
      <h1>Solana Wallet Manager</h1>
      <h2> Your Mnemonic </h2>
      <div className="mnemonic-container">
        {" "}
        {mnemonic.split(" ").map((word, idx) => (
          <div key={idx} className="mnemonic-box">
            {word}
          </div>
        ))}
      </div>
      <GenerateWallet generateNewWallet={generateNewWallet} wallets={wallets} />
      <CheckBalance
        balanceWallet={balanceWallet}
        setBalanceWallet={setBalanceWallet}
        checkBalance={checkBalance}
        balance={balance}
      />
      <AirdropSol
        airdropWallet={airdropWallet}
        setAirdropWallet={setAirdropWallet}
        airdropAmount={airdropAmount}
        setAirdropAmount={setAirdropAmount}
        airdropSol={airdropSol}
      />
    </div>
  );
};

export default App;
