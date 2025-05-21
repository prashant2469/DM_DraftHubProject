import React from 'react';
import { Box, Typography, Chip, Button, useTheme, useMediaQuery } from '@mui/material';
import { ArrowLeft, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player } from '../../data/draftData';
import { formatHeight, formatAge } from '../../utils/formatters';

interface PlayerHeaderProps {
  player: Player;
  averageRank: number;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player, averageRank }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        borderRadius: { xs: 0, md: 2 },
        overflow: 'hidden',
        bgcolor: '#121212'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          bgcolor: '#00538C',
          zIndex: 0
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 2, md: 3 }, px: { xs: 2, md: 4 } }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowLeft size={16} />}
          variant="contained"
          size="small"
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#00538C',
            mb: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            }
          }}
        >
          Back to Big Board
        </Button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: { xs: 3, md: 4 },
            pb: 4
          }}
        >
          <Box
            sx={{
              width: { xs: 180, sm: 220, md: 260 },
              height: { xs: 180, sm: 220, md: 260 },
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #1E1E1E',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#1E1E1E'
            }}
          >
            {player.photoUrl ? (
              <img
                src={player.photoUrl}
                alt={player.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <UserX size={80} color="#666" />
            )}
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'flex-start' },
              gap: { xs: 1, md: 2 },
              mb: 1
            }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: 'white'
                }}
              >
                {player.firstName} {player.lastName}
              </Typography>

              <Chip
                label={`#${Math.round(averageRank)} Prospect`}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: '#00538C',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 3
              }}
            >
              {player.currentTeam} | {player.league}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}
            >
              <Chip
                label={`${formatHeight(player.height)}`}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 500 }}
              />
              <Chip
                label={`${player.weight} lbs`}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 500 }}
              />
              <Chip
                label={`Age: ${formatAge(player.birthDate)}`}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: '#fef2f2', color: '#991b1b', fontWeight: 500 }}
              />
              <Chip
                label={`From: ${player.homeTown}, ${player.homeState || player.homeCountry}`}
                size={isMobile ? "small" : "medium"}
                sx={{ bgcolor: '#eff6ff', color: '#1e40af', fontWeight: 500 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerHeader;