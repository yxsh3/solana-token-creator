import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

function WalletConnect() {
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      const response = await window.solana.connect();
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana wallet not found! Please install Phantom.');
    }
  };

  const handleSubmit = () => {
    // Add wallet address to the user and redirect to the token creation page
    navigate('/createtoken');
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h5" component="h1">
          Connect Wallet
        </Typography>
        <Button variant="contained" color="primary" onClick={connectWallet}>
          Connect to Phantom Wallet
        </Button>
        {walletAddress && (
          <Box my={2}>
            <Typography variant="body1">Wallet Address: {walletAddress}</Typography>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Proceed
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default WalletConnect;
