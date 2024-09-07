// Function to create a token

// const createToken = async (wallet) => {
//   try {
//     // Check balance to ensure it has enough SOL
//     const balance = await connection.getBalance(
//       new PublicKey(wallet.publicKey)
//     );
//     if (balance === 0) {
//       alert("Wallet has 0 SOL. Please fund your wallet with some SOL.");
//       return;
//     }

//     // Create a new mint (token)
//     const mint = await createMint(
//       connection,
//       Keypair.fromSecretKey(Uint8Array.from(wallet.privateKey)), // Corrected key format
//       new PublicKey(wallet.publicKey), // Mint authority (the user's wallet)
//       null, // Freeze authority (null if no freeze authority)
//       9 // Number of decimal places
//     );

//     console.log("Token created:", mint.toString());
//     setToken(mint.toString());
//   } catch (error) {
//     console.error("Error creating token:", error);
//   }
// };
// // Create a user account (Associated Token Account) for the newly minted token
// const createUserAccount = async (wallet) => {
//   try {
//     if (!tokenPublicKey) {
//       alert("Please create a token first.");
//       return;
//     }

//     // Create an Associated Token Account (ATA) for the user
//     const ata = await getOrCreateAssociatedTokenAccount(
//       connection,
//       Keypair.fromSecretKey(Uint8Array.from(wallet.privateKey)), // Payer
//       new PublicKey(tokenPublicKey), // Mint (token public key)
//       new PublicKey(wallet.publicKey) // Owner of the associated account (user's wallet)
//     );

//     console.log("Associated Token Account created:", ata.address.toString());
//     setUserAccount(ata.address.toString()); // Store the ATA address
//   } catch (error) {
//     console.error("Error creating user account:", error);
//   }
// };

/* <button onClick={() => createToken(wallet)}>Create Token</button> */

/* {token && <p>Newly Created Token: {token}</p>} */
