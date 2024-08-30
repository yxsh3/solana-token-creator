import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

function CreateToken() {
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    decimals: 0,
    supply: 0,
  });
  const [walletAddress, setWalletAddress] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [tokenAccountAddress, setTokenAccountAddress] = useState('');

  const handleChange = (e) => {
    setTokenData({ ...tokenData, [e.target.name]: e.target.value });
  };

  const handleWalletChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      console.log(token)
      const response = await axios.post(
        `http://localhost:5000/api/tokens/create`,
        { ...tokenData, walletAddress },
        { headers: { authorization: `Bearer ${token}` } }
      );
      setMintAddress(response.data.mintAddress);
      setTokenAccountAddress(response.data.tokenAccountAddress);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h5" component="h1">Create Token</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Token Name"
            name="name"
            margin="normal"
            onChange={handleChange}
            value={tokenData.name}
          />
          <TextField
            fullWidth
            label="Token Symbol"
            name="symbol"
            margin="normal"
            onChange={handleChange}
            value={tokenData.symbol}
          />
          <TextField
            fullWidth
            label="Decimals"
            name="decimals"
            type="number"
            margin="normal"
            onChange={handleChange}
            value={tokenData.decimals}
          />
          <TextField
            fullWidth
            label="Supply"
            name="supply"
            type="number"
            margin="normal"
            onChange={handleChange}
            value={tokenData.supply}
          />
          <TextField
            fullWidth
            label="Wallet Address"
            name="walletAddress"
            margin="normal"
            onChange={handleWalletChange}
            value={walletAddress}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">Create</Button>
        </form>
        {mintAddress && (
          <Box mt={4}>
            <Typography variant="h6">Token Created Successfully!</Typography>
            <Typography variant="body1">Mint Address: {mintAddress}</Typography>
            <Typography variant="body1">Token Account Address: {tokenAccountAddress}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default CreateToken;
