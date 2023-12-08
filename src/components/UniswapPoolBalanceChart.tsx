import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Uniswap ETH-USDC Pool Balance'
    }
  },
};

const labels = [''];

export const data = {
  labels,
  datasets: [
    {
      label: 'ETH',
      data: labels.map(() => Math.random() * 100),
      backgroundColor: '#FF4081',
    },
    {
      label: 'USDC',
      data: labels.map(() => Math.random() * 100),
      backgroundColor: '#00BCD4',
    },
  ],
};

export function UniswapPoolBalanceChart() {
  return <Bar options={options} data={data} />;
}
