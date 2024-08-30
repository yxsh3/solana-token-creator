import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserTokens() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/tokens/user-tokens`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTokens(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4">Your Tokens</Typography>
        <List>
          {tokens.map((token) => (
            <ListItem button component={Link} to={`/token/${token._id}`} key={token._id}>
              <ListItemText
                primary={token.name}
                secondary={`Symbol: ${token.symbol}, Supply: ${token.supply}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default UserTokens;
