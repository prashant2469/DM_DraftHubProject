import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, useTheme, useMediaQuery } from '@mui/material';

interface FilterControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ 
  sortBy, 
  setSortBy, 
  searchTerm, 
  setSearchTerm 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      gap: 2,
      mb: 4,
      mt: 2,
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      px: 2
    }}>
      <TextField
        label="Search Players"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ 
          flex: isMobile ? '1' : '2',
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#00538C',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#00538C',
          }
        }}
      />
      
      <FormControl variant="outlined" fullWidth sx={{ flex: '1' }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort By"
          sx={{ 
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#00538C',
            },
            '&.Mui-focused .MuiSelect-select': {
              color: '#00538C',
            }
          }}
        >
          <MenuItem value="espn">ESPN Rank</MenuItem>
          <MenuItem value="vecenie">Sam Vecenie Rank</MenuItem>
          <MenuItem value="oconnor">Kevin O'Connor Rank</MenuItem>
          <MenuItem value="boone">Kyle Boone Rank</MenuItem>
          <MenuItem value="parrish">Gary Parrish Rank</MenuItem>
          <MenuItem value="height">Height (Tallest First)</MenuItem>
          <MenuItem value="weight">Weight (Heaviest First)</MenuItem>
          <MenuItem value="age">Age (Oldest First)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterControls;