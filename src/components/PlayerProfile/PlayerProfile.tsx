import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Container, Box, Grid } from '@mui/material';
import PlayerHeader from './PlayerHeader';
import PhysicalAttributes from './PhysicalAttributes';
import ScoutRankingsTable from './ScoutRankingsTable';
import ScoutingReports from './ScoutingReports';
import GameStats from './GameStats';
import GamePerformanceCards from './GamePerformanceCards';
import draftData from '../../data/draftData';
import { calculateAverageRank } from '../../utils/formatters';

const PlayerProfile: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const id = parseInt(playerId || '0');
  
  const playerData = useMemo(() => {
    const player = draftData.bio.find(p => p.playerId === id);
    const ranking = draftData.scoutRankings.find(r => r.playerId === id);
    const measurement = draftData.measurements.find(m => m.playerId === id);
    const stats = draftData.seasonLogs.filter(s => s.playerId === id);
    const gameLogs = draftData.game_logs.filter(g => g.playerId === id);
    
    if (!player || !ranking || !measurement) return null;
    
    const rankValues = Object.entries(ranking)
      .filter(([key]) => key !== 'playerId')
      .map(([_, value]) => value);
    
    const avgRank = calculateAverageRank(rankValues);
    
    return { player, ranking, measurement, stats, gameLogs, avgRank };
  }, [id]);
  
  if (!playerData) {
    return <Navigate to="/" />;
  }
  
  return (
    <Container maxWidth="lg">
      <PlayerHeader player={playerData.player} averageRank={playerData.avgRank} />
      
      <GamePerformanceCards gameLogs={playerData.gameLogs} />
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <GameStats stats={playerData.stats} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <PhysicalAttributes measurement={playerData.measurement} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ScoutRankingsTable ranking={playerData.ranking} />
        </Grid>
        
        <Grid item xs={12}>
          <ScoutingReports playerId={id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerProfile;