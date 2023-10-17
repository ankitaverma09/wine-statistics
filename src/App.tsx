// src/App.tsx

import React, { useEffect, useState } from 'react';
import FlavanoidsStatisticsTable from './components/FlavanoidsStatisticsTable';
type WineData = {
  [key: string]: number;
  Alcohol: number;
  Flavanoids: number;
  Class: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
 
};

const wineData: WineData[] = [
  {
    Alcohol: 12.8,
    Flavanoids: 3.25,
    Class: 1,
    Ash: 2.4,
    Hue: 1.12,
    Magnesium: 106,
    Gamma : 111
  },
];
const calculateGamma = (data: WineData[]): number[] => {
  return data.map(item => (item.Ash * item.Hue) / item.Magnesium);
};
const calculateMean = (values: number[]): number => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  return values.length > 0 ? sum / values.length : 0;
};
const calculateMedian = (values: number[]): number => {
  const sortedValues = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);
  return sortedValues.length > 0 ? (sortedValues.length % 2 === 0 ? (sortedValues[mid - 1] + sortedValues[mid]) / 2 : sortedValues[mid]) : 0;
};
const calculateMode = (values: number[]): number | null => {
  const valueCounts: { [key: number]: number } = {};

  values.forEach(val => {
    if (valueCounts[val]) {
      valueCounts[val]++;
    } else {
      valueCounts[val] = 1;
    }
  });
  let maxCount = 0;
  let mode: number | null = null;

  for (const val in valueCounts) {
    if (valueCounts[val] > maxCount) {
      mode = parseFloat(val);
      maxCount = valueCounts[val];
    }
  }

  return mode;
};

interface ClassWiseStatistics {
  mean: number;
  median: number;
  mode: number | null;
}
interface ClassWiseStatisticsMap {
  [key: string]: ClassWiseStatistics;
}

const calculateClassWiseStatistics = (data: WineData[], propertyName: keyof WineData): ClassWiseStatisticsMap => {
  const classWiseData: { [key: string]: number[] } = {};

  data.forEach(item => {
    const classKey = `Class ${item.Class}`;
    if (!classWiseData[classKey]) {
      classWiseData[classKey] = [];
    }
    if (item[propertyName] !== undefined) {
      classWiseData[classKey].push(item[propertyName]);
    }
  });
  const classWiseStatistics:ClassWiseStatisticsMap = {};
 
  Object.keys(classWiseData).forEach(classKey => {
    const values = classWiseData[classKey];
    classWiseStatistics[classKey] = {
      mean: calculateMean(values),
      median: calculateMedian(values),
      mode: calculateMode(values),
    };
    
  });

  return classWiseStatistics;
};

const App: React.FC = () => {
  const [gammaStatistics, setGammaStatistics] = useState<ClassWiseStatisticsMap>({});

useEffect(() => {
  const gammaValues = calculateGamma(wineData);
  wineData.forEach((item, index) => {
    item.Gamma = gammaValues[index];
  });
  const classWiseGammaStatistics = calculateClassWiseStatistics(wineData, 'Gamma');
  const formattedStatistics: ClassWiseStatisticsMap = {};
  Object.keys(classWiseGammaStatistics).forEach(classKey => {
    
  });

  setGammaStatistics(formattedStatistics);
}, []);

  return (
    <div>
      <h1>Flavanoids Statistics</h1>
      <FlavanoidsStatisticsTable dataset={wineData} />
      <div className="App">
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(gammaStatistics).map(classKey => (
              <th key={classKey}>{classKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Gamma Mean</td>
            {Object.keys(gammaStatistics).map(classKey => (
              <td key={classKey}>{gammaStatistics[classKey].mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.keys(gammaStatistics).map(classKey => (
              <td key={classKey}>{gammaStatistics[classKey].median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.keys(gammaStatistics).map(classKey => (
               <td key={classKey}>{gammaStatistics[classKey]?.mode?.toFixed(3) || 'N/A'}</td>
            ))}
             </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
  
};

export default App;
