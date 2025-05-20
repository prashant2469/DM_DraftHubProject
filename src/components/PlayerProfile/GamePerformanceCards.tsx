import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface GameLog {
  date: string;
  opponent: string;
  pts: number;
  "fg%": number;
  fgm: number;
  fga: number;
  tpm: number;
  tpa: number;
  "tp%": number;
}

interface GamePerformanceCardsProps {
  gameLogs: GameLog[];
}

const GamePerformanceCards: React.FC<GamePerformanceCardsProps> = ({ gameLogs }) => {
  const getBestGame = () => {
    return gameLogs.reduce((best, current) => {
      const currentScore = current.pts + (current["fg%"] * 0.5);
      const bestScore = best.pts + (best["fg%"] * 0.5);
      return currentScore > bestScore ? current : best;
    });
  };

  const getWorstGame = () => {
    return gameLogs.reduce((worst, current) => {
      const currentScore = current.pts + (current["fg%"] * 0.5);
      const worstScore = worst.pts + (worst["fg%"] * 0.5);
      return currentScore < worstScore ? current : worst;
    });
  };

  const bestGame = getBestGame();
  const worstGame = getWorstGame();

  const StatItem = ({ label, value, isPercentage = false }) => (
    <Box sx={{ textAlign: 'center', flex: 1 }}>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        {isPercentage 
          ? (value != null ? `${value.toFixed(1)}%` : 'N/A')
          : (value != null ? value : 'N/A')
        }
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  const GameCard = ({ game, type }: { game: GameLog, type: 'best' | 'worst' }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: '#1E1E1E',
        border: '1px solid #333',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
          {type === 'best' ? 'Best Performance' : 'Worst Performance'}
        </Typography>
        {type === 'best' ? (
          <TrendingUp color="#4CAF50" size={24} />
        ) : (
          <TrendingDown color="#f44336" size={24} />
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        vs {game.opponent} • {new Date(game.date).toLocaleDateString()}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <StatItem label="PTS" value={game.pts} />
        <StatItem label="FG%" value={game["fg%"]} isPercentage />
        <StatItem label="3P%" value={game["tp%"]} isPercentage />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
        {game.fgm}/{game.fga} FG • {game.tpm}/{game.tpa} 3PT
      </Typography>
    </Paper>
  );

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={6}>
        <GameCard game={bestGame} type="best" />
      </Grid>
      <Grid item xs={12} md={6}>
        <GameCard game={worstGame} type="worst" />
      </Grid>
    </Grid>
  );
};

export default GamePerformanceCards;