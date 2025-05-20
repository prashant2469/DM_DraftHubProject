import React, { useState } from 'react';
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import draftData from '../../data/draftData';
import { formatHeight, formatAge } from '../../utils/formatters';

const PlayerComparison = () => {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');

  const getPlayerData = (playerId: string) => {
    if (!playerId) return null;
    const id = parseInt(playerId);
    return {
      bio: draftData.bio.find(p => p.playerId === id),
      rankings: draftData.scoutRankings.find(r => r.playerId === id)
    };
  };

  const player1 = getPlayerData(player1Id);
  const player2 = getPlayerData(player2Id);

  const compareValues = (val1: number, val2: number) => {
    if (val1 === val2) return 'equal';
    return val1 > val2 ? 'better' : 'worse';
  };

  const betterStyle = { color: '#4CAF50', fontWeight: 'bold' };
  const worseStyle = { color: '#f44336' };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Player Comparison
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Player 1</InputLabel>
            <Select
              value={player1Id}
              onChange={(e) => setPlayer1Id(e.target.value)}
              label="Select Player 1"
            >
              {draftData.bio.map(player => (
                <MenuItem key={player.playerId} value={player.playerId}>
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Player 2</InputLabel>
            <Select
              value={player2Id}
              onChange={(e) => setPlayer2Id(e.target.value)}
              label="Select Player 2"
            >
              {draftData.bio.map(player => (
                <MenuItem key={player.playerId} value={player.playerId}>
                  {player.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {player1 && player2 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attribute</TableCell>
                <TableCell align="right">{player1.bio?.name}</TableCell>
                <TableCell align="right">{player2.bio?.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Height</TableCell>
                <TableCell align="right" style={compareValues(player1.bio?.height || 0, player2.bio?.height || 0) === 'better' ? betterStyle : worseStyle}>
                  {formatHeight(player1.bio?.height || 0)}
                </TableCell>
                <TableCell align="right" style={compareValues(player2.bio?.height || 0, player1.bio?.height || 0) === 'better' ? betterStyle : worseStyle}>
                  {formatHeight(player2.bio?.height || 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell align="right" style={compareValues(player1.bio?.weight || 0, player2.bio?.weight || 0) === 'better' ? betterStyle : worseStyle}>
                  {player1.bio?.weight} lbs
                </TableCell>
                <TableCell align="right" style={compareValues(player2.bio?.weight || 0, player1.bio?.weight || 0) === 'better' ? betterStyle : worseStyle}>
                  {player2.bio?.weight} lbs
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Age</TableCell>
                <TableCell align="right" style={compareValues(formatAge(player2.bio?.birthDate || ''), formatAge(player1.bio?.birthDate || '')) === 'better' ? betterStyle : worseStyle}>
                  {formatAge(player1.bio?.birthDate || '')}
                </TableCell>
                <TableCell align="right" style={compareValues(formatAge(player1.bio?.birthDate || ''), formatAge(player2.bio?.birthDate || '')) === 'better' ? betterStyle : worseStyle}>
                  {formatAge(player2.bio?.birthDate || '')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Current Team</TableCell>
                <TableCell align="right">{player1.bio?.currentTeam}</TableCell>
                <TableCell align="right">{player2.bio?.currentTeam}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ESPN Rank</TableCell>
                <TableCell align="right" style={compareValues(player2.rankings?.['ESPN Rank'] || 0, player1.rankings?.['ESPN Rank'] || 0) === 'better' ? betterStyle : worseStyle}>
                  {player1.rankings?.['ESPN Rank']}
                </TableCell>
                <TableCell align="right" style={compareValues(player1.rankings?.['ESPN Rank'] || 0, player2.rankings?.['ESPN Rank'] || 0) === 'better' ? betterStyle : worseStyle}>
                  {player2.rankings?.['ESPN Rank']}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PlayerComparison;