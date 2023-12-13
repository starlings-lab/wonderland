import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "",
      font: {
        size: 20,
      },
      padding: {
        top: 12,
        bottom: 20,
      },
    },
  },
};

const labels = [""];

export const data = {
  labels,
  datasets: [
    {
      label: "ETH",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "#FF4081",
    },
    {
      label: "USDC",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "#FFC107",
    },
  ],
};

export type UniswapPoolBalanceChartProps = {
  className?: string;
  title: string;
  data?: typeof data;
};

export function UniswapPoolBalanceChart(props: UniswapPoolBalanceChartProps) {
  options.plugins.title.text = props.title;
  return (
    <div className={props.className}>
      <Bar options={options} data={props.data ?? data} />
    </div>
  );
}
