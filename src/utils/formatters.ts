export const formatHeight = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round((inches % 12) * 10) / 10;
  return `${feet}'${remainingInches}"`;
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const calculateDeviation = (rank: number, averageRank: number): number => {
  return rank - averageRank;
};

export const calculateAverageRank = (ranks: number[]): number => {
  const validRanks = ranks.filter(rank => !isNaN(rank));
  if (validRanks.length === 0) return 0;
  
  const sum = validRanks.reduce((acc, curr) => acc + curr, 0);
  return sum / validRanks.length;
};