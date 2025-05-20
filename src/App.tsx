import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import BigBoard from './components/BigBoard/BigBoard';
import PlayerProfile from './components/PlayerProfile/PlayerProfile';
import PlayerComparison from './components/PlayerComparison/PlayerComparison';
import { ScoutingReportProvider } from './contexts/ScoutingReportContext';

// Create a theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00538C', // Mavericks blue
    },
    secondary: {
      main: '#B8C4CA', // Mavericks silver
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScoutingReportProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<BigBoard />} />
                <Route path="/player/:playerId" element={<PlayerProfile />} />
                <Route path="/compare" element={<PlayerComparison />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ScoutingReportProvider>
    </ThemeProvider>
  );
}

export default App;