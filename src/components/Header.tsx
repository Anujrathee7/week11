import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Joke Generator
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            variant={location.pathname === '/' ? 'outlined' : 'text'}
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/saved"
            variant={location.pathname === '/saved' ? 'outlined' : 'text'}
          >
            Saved
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;