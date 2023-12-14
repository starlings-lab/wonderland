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
  maintainAspectRatio: true,
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "",
      font: {
        size: 18,
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
  data?: typeof data;
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  titleOptions?: object;
};

export function UniswapPoolBalanceChart(props: UniswapPoolBalanceChartProps) {
  options.maintainAspectRatio = !!props.maintainAspectRatio
    ? props.maintainAspectRatio
    : true;
  options.aspectRatio = !!props.aspectRatio ? props.aspectRatio : 1;

  // spread props.titleOptions to options.title
  options.plugins.title = {
    ...options.plugins.title,
    ...props.titleOptions,
  };

  return (
    <div className={props.className}>
      <Bar options={options} data={props.data ?? data} />
    </div>
  );
}
