import React, { createContext, useContext, useState } from 'react';
import { ScoutingReport } from '../data/draftData';

interface ScoutingReportContextType {
  scoutingReports: ScoutingReport[];
  addScoutingReport: (report: ScoutingReport) => void;
  getReportsForPlayer: (playerId: number) => ScoutingReport[];
}

const ScoutingReportContext = createContext<ScoutingReportContextType | undefined>(undefined);

export const useScoutingReports = (): ScoutingReportContextType => {
  const context = useContext(ScoutingReportContext);
  if (!context) {
    throw new Error('useScoutingReports must be used within a ScoutingReportProvider');
  }
  return context;
};

export const ScoutingReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scoutingReports, setScoutingReports] = useState<ScoutingReport[]>([]);

  const addScoutingReport = (report: ScoutingReport) => {
    setScoutingReports(prevReports => [...prevReports, report]);
  };

  const getReportsForPlayer = (playerId: number) => {
    return scoutingReports.filter(report => report.playerId === playerId);
  };

  const value = {
    scoutingReports,
    addScoutingReport,
    getReportsForPlayer
  };

  return (
    <ScoutingReportContext.Provider value={value}>
      {children}
    </ScoutingReportContext.Provider>
  );
};