import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function TokenDetails() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h5" component="h1">
          Token Details
        </Typography>
        {/* Display token details here */}
      </Box>
    </Container>
  );
}

export default TokenDetails;
