import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GameLog } from '../../data/draftData';

interface GameStatsProps {
  stats: GameLog[];
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3,
        mb: 4,
        bgcolor: '#121212',
        border: '1px solid #333'
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom color="#00538C">
        Season Statistics
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>League</TableCell>
              <TableCell align="right">GP</TableCell>
              <TableCell align="right">MIN</TableCell>
              <TableCell align="right">PTS</TableCell>
              <TableCell align="right">REB</TableCell>
              <TableCell align="right">AST</TableCell>
              <TableCell align="right">STL</TableCell>
              <TableCell align="right">BLK</TableCell>
              <TableCell align="right">FG%</TableCell>
              <TableCell align="right">3P%</TableCell>
              <TableCell align="right">FT%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell>{stat.League}</TableCell>
                <TableCell align="right">{stat.GP}</TableCell>
                <TableCell align="right">{stat.MP.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.PTS.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.TRB.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.AST.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.STL.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.BLK.toFixed(1)}</TableCell>
                <TableCell align="right">{stat["FG%"].toFixed(1)}%</TableCell>
                <TableCell align="right">{stat["3P%"].toFixed(1)}%</TableCell>
                <TableCell align="right">{stat.FTP.toFixed(1)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GameStats;