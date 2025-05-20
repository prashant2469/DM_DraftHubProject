import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import ProspectCard from './ProspectCard';
import FilterControls from './FilterControls';
import BigBoardHeader from './BigBoardHeader';
import draftData from '../../data/draftData';
import { formatAge } from '../../utils/formatters';

const BigBoard: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('consensus');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Combine player data with rankings
  const players = useMemo(() => {
    return draftData.bio.map(player => {
      const ranking = draftData.scoutRankings.find(r => r.playerId === player.playerId);
      return { player, ranking };
    }).filter(item => item.ranking); // Only include players with ranking data
  }, []);

  // Sort and filter players
  const sortedAndFilteredPlayers = useMemo(() => {
    // Filter by search term
    let filtered = players.filter(item => 
      item.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.player.currentTeam.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort based on selected criteria
    return filtered.sort((a, b) => {
      if (!a.ranking || !b.ranking) return 0;
      
      switch (sortBy) {
        case 'consensus':
          // Average of all rankings
          const aRanks = Object.entries(a.ranking)
            .filter(([key]) => key !== 'playerId' && !isNaN(a.ranking[key]))
            .map(([_, value]) => value);
          const bRanks = Object.entries(b.ranking)
            .filter(([key]) => key !== 'playerId' && !isNaN(b.ranking[key]))
            .map(([_, value]) => value);
          
          const aAvg = aRanks.reduce((acc, curr) => acc + curr, 0) / aRanks.length;
          const bAvg = bRanks.reduce((acc, curr) => acc + curr, 0) / bRanks.length;
          
          return aAvg - bAvg;
        case 'espn':
          return a.ranking['ESPN Rank'] - b.ranking['ESPN Rank'];
        case 'vecenie':
          return a.ranking['Sam Vecenie Rank'] - b.ranking['Sam Vecenie Rank'];
        case 'oconnor':
          return a.ranking['Kevin O\'Connor Rank'] - b.ranking['Kevin O\'Connor Rank'];
        case 'boone':
          return a.ranking['Kyle Boone Rank'] - b.ranking['Kyle Boone Rank'];
        case 'parrish':
          return a.ranking['Gary Parrish Rank'] - b.ranking['Gary Parrish Rank'];
        case 'height':
          return b.player.height - a.player.height;
        case 'weight':
          return b.player.weight - a.player.weight;
        case 'age':
          return formatAge(b.player.birthDate) - formatAge(a.player.birthDate);
        default:
          return 0;
      }
    });
  }, [players, sortBy, searchTerm]);

  return (
    <Container maxWidth="xl">
      <BigBoardHeader />
      
      <FilterControls 
        sortBy={sortBy} 
        setSortBy={setSortBy} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      {sortedAndFilteredPlayers.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No players found matching "{searchTerm}"
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {sortedAndFilteredPlayers.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.player.playerId}>
              <ProspectCard 
                player={item.player} 
                ranking={item.ranking!} 
                boardRank={index + 1} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BigBoard;