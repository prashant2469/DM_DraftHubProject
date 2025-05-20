import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Rating, 
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { FilePlus } from 'lucide-react';
import { useScoutingReports } from '../../contexts/ScoutingReportContext';
import { ScoutingReport } from '../../data/draftData';

interface ScoutingReportFormProps {
  playerId: number;
}

const ScoutingReportForm: React.FC<ScoutingReportFormProps> = ({ playerId }) => {
  const { addScoutingReport } = useScoutingReports();
  
  const [author, setAuthor] = useState('');
  const [strengths, setStrengths] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [notes, setNotes] = useState('');
  const [fitRating, setFitRating] = useState<number | null>(null);
  const [overallRating, setOverallRating] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  const resetForm = () => {
    setAuthor('');
    setStrengths('');
    setWeaknesses('');
    setNotes('');
    setFitRating(null);
    setOverallRating(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author || !strengths || !weaknesses || !fitRating || !overallRating) {
      return; // Don't submit if required fields are missing
    }
    
    const newReport: ScoutingReport = {
      id: Date.now().toString(),
      playerId,
      author,
      date: new Date().toISOString().split('T')[0],
      strengths,
      weaknesses,
      fitRating,
      overallRating,
      notes
    };
    
    addScoutingReport(newReport);
    resetForm();
    setIsFormOpen(false);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          startIcon={<FilePlus size={18} />}
          onClick={toggleForm}
          sx={{ 
            bgcolor: isFormOpen ? '#94a3b8' : '#0F52BA',
            '&:hover': {
              bgcolor: isFormOpen ? '#64748b' : '#0a3d8f',
            }
          }}
        >
          {isFormOpen ? 'Cancel Report' : 'Add New Scouting Report'}
        </Button>
      </Box>
      
      {isFormOpen && (
        <Paper 
          elevation={0} 
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            border: '1px solid #e2e8f0'
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom color="#0F52BA">
            Create New Scouting Report
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              sx={{ flex: 1 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: '50%' } }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Team Fit Rating*
                </Typography>
                <Rating 
                  value={fitRating} 
                  onChange={(_, value) => setFitRating(value)}
                  precision={0.5}
                  sx={{ color: '#0F52BA' }}
                />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Overall Rating (1-10)*
                </Typography>
                <Rating 
                  value={overallRating} 
                  onChange={(_, value) => setOverallRating(value)}
                  precision={0.5}
                  max={10}
                />
                {overallRating && (
                  <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
                    ({overallRating})
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
          
          <TextField
            label="Strengths"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Weaknesses"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={3}
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Additional Notes"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => {
                resetForm();
                setIsFormOpen(false);
              }}
              sx={{ 
                borderColor: '#94a3b8',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#64748b',
                  bgcolor: 'rgba(100, 116, 139, 0.04)'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ 
                bgcolor: '#0F52BA',
                '&:hover': {
                  bgcolor: '#0a3d8f',
                }
              }}
              disabled={!author || !strengths || !weaknesses || !fitRating || !overallRating}
            >
              Submit Report
            </Button>
          </Box>
        </Paper>
      )}
      
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Scouting report has been added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ScoutingReportForm;