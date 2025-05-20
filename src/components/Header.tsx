import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ClipboardList } from 'lucide-react';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#00538C' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            Mavericks Draft Hub
          </Typography>
        </Link>
        <div style={{ marginLeft: 'auto' }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Big Board
          </Button>
          <Button
            component={Link}
            to="/compare"
            color="inherit"
          >
            Compare Players
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header