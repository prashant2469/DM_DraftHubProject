import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ScoutingReportCard from './ScoutingReportCard';
import ScoutingReportForm from './ScoutingReportForm';
import { useScoutingReports } from '../../contexts/ScoutingReportContext';

interface ScoutingReportsProps {
  playerId: number;
}

const ScoutingReports: React.FC<ScoutingReportsProps> = ({ playerId }) => {
  const { getReportsForPlayer } = useScoutingReports();
  const reports = getReportsForPlayer(playerId);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom color="#0F52BA">
        Scouting Reports
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <ScoutingReportForm playerId={playerId} />
      
      {reports.length > 0 ? (
        reports.map((report) => (
          <ScoutingReportCard key={report.id} report={report} />
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
          No scouting reports available for this player yet. Be the first to add one!
        </Typography>
      )}
    </Box>
  );
};

export default ScoutingReports;