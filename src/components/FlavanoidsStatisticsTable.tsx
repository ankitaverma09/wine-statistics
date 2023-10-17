// src/components/FlavanoidsStatisticsTable.tsx

import React from 'react';
import { calculateMean, calculateMedian, calculateMode } from '../utils/statistics';

interface WineData {
  Alcohol: number;
  Flavanoids: number;
}

interface FlavanoidsStatisticsTableProps {
  dataset: WineData[];
}

const FlavanoidsStatisticsTable: React.FC<FlavanoidsStatisticsTableProps> = ({ dataset }) => {
const uniqueAlcoholClasses = [...new Set(dataset.map((item) => item.Alcohol))];

  const calculateClassStatistics = (alcoholClass: number) => {
    const flavanoidsValues = dataset
      .filter((item) => item.Alcohol === alcoholClass)
      .map((item) => item.Flavanoids);

    const mean = calculateMean(flavanoidsValues).toFixed(2);
    const median = calculateMedian(flavanoidsValues).toFixed(2);
    const mode = calculateMode(flavanoidsValues).join(', ');

    return (
      <tr key={alcoholClass}>
        <td>{alcoholClass}</td>
        <td>{mean}</td>
        <td>{median}</td>
        <td>{mode}</td>
      </tr>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {uniqueAlcoholClasses.map((alcoholClass) => (
            <th key={alcoholClass}>Class {alcoholClass}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {uniqueAlcoholClasses.map((alcoholClass) =>
            calculateClassStatistics(alcoholClass)
          )}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {uniqueAlcoholClasses.map((alcoholClass) =>
            calculateClassStatistics(alcoholClass)
          )}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {uniqueAlcoholClasses.map((alcoholClass) =>
            calculateClassStatistics(alcoholClass)
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsStatisticsTable;
