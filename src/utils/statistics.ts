// src/utils/statistics.ts

const calculateMean = (values: number[]): number => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };
  
  const calculateMedian = (values: number[]): number => {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
  
    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    } else {
      return sortedValues[middle];
    }
  };
  
  const calculateMode = (values: number[]): number[] => {
    const frequencyMap: { [key: number]: number } = {};
  
    values.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });
  
    let mode: number[] = [];
    let maxFrequency = 0;
  
    for (const value in frequencyMap) {
      const frequency = frequencyMap[value];
      if (frequency > maxFrequency) {
        mode = [parseFloat(value)];
        maxFrequency = frequency;
      } else if (frequency === maxFrequency) {
        mode.push(parseFloat(value));
      }
    }
  
    return mode;
  };
  
  export { calculateMean, calculateMedian, calculateMode };
  