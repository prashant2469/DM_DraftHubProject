import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const BigBoardHeader: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        my: 4,
        px: 2
      }}
    >
      <Typography 
        variant={isMobile ? "h4" : isTablet ? "h3" : "h2"} 
        component="h1"
        sx={{ 
          fontWeight: 800,
          color: '#0F52BA',
          mb: 2
        }}
      >
        2025 NBA Draft Big Board
      </Typography>
      <Typography 
        variant={isMobile ? "body2" : isTablet ? "body1" : "h6"} 
        sx={{ 
          maxWidth: '800px',
          color: '#555',
          lineHeight: 1.6
        }}
      >
        Welcome to the Mavericks Draft Hub.
This is your command center for scouting the next wave of NBA talent — complete with rankings, player profiles, performance snapshots, and scouting insights.
Browse the board, dive into profiles, and add your own reports. Whether you're hunting for the next star or the best system fit, everything you need is right here.
      </Typography>
    </Box>
  );
};

export default BigBoardHeader;