import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Box, Chip, useTheme, useMediaQuery } from '@mui/material';
import { ChevronRight, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { Player, ScoutRanking } from '../../data/draftData';
import { formatHeight, formatAge } from '../../utils/formatters';

interface ProspectCardProps {
  player: Player;
  ranking: ScoutRanking;
  boardRank: number;
}

const ProspectCard: React.FC<ProspectCardProps> = ({ player, ranking, boardRank }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const scoutRanks = Object.entries(ranking)
    .filter(([key]) => key !== 'playerId' && !isNaN(ranking[key]))
    .map(([_, value]) => value);
  
  const avgRank = scoutRanks.reduce((acc, curr) => acc + curr, 0) / scoutRanks.length;
  
  const getScoutOpinion = (scoutRank: number, avgRank: number) => {
    const deviation = scoutRank - avgRank;
    if (deviation <= -2) return 'high';
    if (deviation >= 2) return 'low';
    return 'neutral';
  };

  const placeholderImage = 'https://images.pexels.com/photos/1103835/pexels-photo-1103835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <Card 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardActionArea component={Link} to={`/player/${player.playerId}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', pt: 3, pb: 2 }}>
          <Box 
            sx={{ 
              width: 120,
              height: 120,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #00538C',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <CardMedia
              component="img"
              image={player.photoUrl || placeholderImage}
              alt={player.name}
              sx={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 12, 
              left: 12, 
              bgcolor: '#00538C',
              color: 'white', 
              width: 32, 
              height: 32, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            {boardRank}
          </Box>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h2" fontWeight={700} gutterBottom align="center">
            {player.firstName} <span style={{ color: '#00538C' }}>{player.lastName}</span>
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: 'center' }}>
            <Chip 
              label={`${player.currentTeam}`} 
              size="small" 
              sx={{ bgcolor: '#e0e7ff', color: '#3730a3', fontWeight: 500 }}
            />
            <Chip 
              label={formatHeight(player.height)} 
              size="small" 
              sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 500 }}
            />
            <Chip 
              label={`${player.weight} lbs`} 
              size="small" 
              sx={{ bgcolor: '#f0fdf4', color: '#166534', fontWeight: 500 }}
            />
            <Chip 
              label={`Age: ${formatAge(player.birthDate)}`} 
              size="small" 
              sx={{ bgcolor: '#fef2f2', color: '#991b1b', fontWeight: 500 }}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" paragraph sx={{ mb: 2 }}>
            Scout rankings deviation from average ({avgRank.toFixed(1)}):
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {Object.entries(ranking)
              .filter(([key]) => key !== 'playerId' && !isNaN(ranking[key]))
              .map(([scout, rank]) => {
                const opinion = getScoutOpinion(rank, avgRank);
                return (
                  <Box key={scout} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ minWidth: isMobile ? '120px' : '180px', fontWeight: 500 }}>
                      {scout.replace(' Rank', '')}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight={600}>
                        {rank}
                      </Typography>
                      {opinion === 'high' && (
                        <TrendingUp size={16} color="#16a34a" style={{ marginLeft: 4 }} />
                      )}
                      {opinion === 'low' && (
                        <TrendingDown size={16} color="#dc2626" style={{ marginLeft: 4 }} />
                      )}
                      {opinion === 'neutral' && (
                        <Star size={16} color="#eab308" style={{ marginLeft: 4 }} />
                      )}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </CardContent>
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            pt: 0,
            color: '#00538C',
            fontWeight: 600,
            justifyContent: 'center'
          }}
        >
          <Typography variant="body2" sx={{ mr: 1 }}>
            View Full Profile
          </Typography>
          <ChevronRight size={16} />
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProspectCard;