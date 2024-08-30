import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import CreateToken from './components/CreateToken';
import TokenDetails from './components/TokenDetails';
import WalletConnect from './components/WalletConnect';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UserTokens from './components/UserTokens';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Solana Token Creator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/createtoken" element={<CreateToken />} />
            <Route path="/token/:id" element={<TokenDetails />} />
            <Route path="/wallet" element={<WalletConnect />} />
            <Route path="/user-tokens" element={<UserTokens />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
