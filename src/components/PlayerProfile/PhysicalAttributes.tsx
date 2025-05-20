import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Measurement } from '../../data/draftData';
import { formatHeight } from '../../utils/formatters';

interface PhysicalAttributesProps {
  measurement: Measurement;
}

const PhysicalAttributes: React.FC<PhysicalAttributesProps> = ({ measurement }) => {
  const AttributeItem = ({ label, value, unit = '' }: { label: string; value: number | string | null; unit?: string }) => (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ p: 2, bgcolor: '#1E1E1E', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h6" fontWeight={600}>
          {value ? `${value}${unit}` : 'N/A'}
        </Typography>
      </Box>
    </Grid>
  );

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
        Physical Measurements
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <AttributeItem label="Height (w/ shoes)" value={formatHeight(measurement.heightShoes)} />
        <AttributeItem label="Height (no shoes)" value={formatHeight(measurement.heightNoShoes)} />
        <AttributeItem label="Wingspan" value={formatHeight(measurement.wingspan)} />
        <AttributeItem label="Standing Reach" value={formatHeight(measurement.reach)} />
        <AttributeItem label="Weight" value={measurement.weight} unit=" lbs" />
        <AttributeItem label="Body Fat" value={measurement.bodyFat} unit="%" />
        <AttributeItem label="Hand Length" value={measurement.handLength} unit='"' />
        <AttributeItem label="Hand Width" value={measurement.handWidth} unit='"' />
      </Grid>
    </Paper>
  );
};

export default PhysicalAttributes;