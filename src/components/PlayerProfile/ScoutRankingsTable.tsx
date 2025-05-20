import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { ScoutRanking } from '../../data/draftData';

interface ScoutRankingsTableProps {
  ranking: ScoutRanking;
}

const ScoutRankingsTable: React.FC<ScoutRankingsTableProps> = ({ ranking }) => {
  // Calculate the average ranking
  const rankValues = Object.entries(ranking)
    .filter(([key]) => key !== 'playerId')
    .map(([_, value]) => value);
  
  const avgRank = rankValues.reduce((acc, curr) => acc + curr, 0) / rankValues.length;
  
  // Determine if a scout is high or low on a player
  const getScoutOpinion = (scoutRank: number) => {
    const deviation = scoutRank - avgRank;
    if (deviation <= -2) return 'high';
    if (deviation >= 2) return 'low';
    return 'neutral';
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        border: '1px solid #e2e8f0'
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom color="#0F52BA">
        Scout Rankings
      </Typography>
      
      <Typography variant="body1" paragraph color="text.secondary">
        Average Ranking: <strong>{avgRank.toFixed(1)}</strong>
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700 } }}>
              <TableCell>Scout</TableCell>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Deviation</TableCell>
              <TableCell align="right">Assessment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ranking)
              .filter(([key]) => key !== 'playerId')
              .map(([scout, rank]) => {
                const opinion = getScoutOpinion(rank);
                const deviation = rank - avgRank;
                
                return (
                  <TableRow key={scout} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      {scout.replace(' Rank', '')}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>
                      {rank}
                    </TableCell>
                    <TableCell align="center">
                      {deviation.toFixed(1)}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {opinion === 'high' ? (
                          <>
                            <Typography variant="body2" color="#16a34a" fontWeight={500} sx={{ mr: 1 }}>
                              High
                            </Typography>
                            <TrendingUp size={18} color="#16a34a" />
                          </>
                        ) : opinion === 'low' ? (
                          <>
                            <Typography variant="body2" color="#dc2626" fontWeight={500} sx={{ mr: 1 }}>
                              Low
                            </Typography>
                            <TrendingDown size={18} color="#dc2626" />
                          </>
                        ) : (
                          <>
                            <Typography variant="body2" color="#6b7280" fontWeight={500} sx={{ mr: 1 }}>
                              Neutral
                            </Typography>
                            <Minus size={18} color="#6b7280" />
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ScoutRankingsTable;