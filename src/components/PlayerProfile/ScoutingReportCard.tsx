import React from 'react';
import { Paper, Typography, Box, Divider, Rating } from '@mui/material';
import { ScoutingReport } from '../../data/draftData';

interface ScoutingReportCardProps {
  report: ScoutingReport;
}

const ScoutingReportCard: React.FC<ScoutingReportCardProps> = ({ report }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        border: '1px solid #e2e8f0',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Scouting Report by {report.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(report.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Team Fit
          </Typography>
          <Rating 
            value={report.fitRating} 
            precision={0.5} 
            readOnly 
            sx={{ 
              color: '#0F52BA',
              '& .MuiRating-iconEmpty': {
                color: '#cbd5e1'
              }
            }} 
          />
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Overall Rating
          </Typography>
          <Rating 
            value={report.overallRating} 
            precision={0.5} 
            readOnly 
            max={10} 
            sx={{ 
              color: report.overallRating >= 8 ? '#16a34a' : 
                     report.overallRating >= 6 ? '#eab308' : '#dc2626',
              '& .MuiRating-iconEmpty': {
                color: '#cbd5e1'
              }
            }} 
          />
          <Typography variant="body2" color="text.secondary" display="inline" sx={{ ml: 1 }}>
            ({report.overallRating}/10)
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} color="#16a34a" gutterBottom>
          Strengths
        </Typography>
        <Typography variant="body2" paragraph>
          {report.strengths}
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} color="#dc2626" gutterBottom>
          Weaknesses
        </Typography>
        <Typography variant="body2" paragraph>
          {report.weaknesses}
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" fontWeight={600} color="#6b7280" gutterBottom>
          Additional Notes
        </Typography>
        <Typography variant="body2">
          {report.notes}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ScoutingReportCard;