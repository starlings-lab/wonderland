import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: true,
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Constant Product Price Curve",
      font: {
        size: 18,
      },
      padding: {
        top: 12,
        bottom: 20,
      },
    },
  },

  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "ETH",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "USDC",
      },
    },
  },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const data = {
  labels,
  datasets: [
    {
      label: "ETH-USDC",
      data: [
        200000, 100000, 66666, 50000, 40000, 33333, 28571, 25000, 22222, 20000,
        18181, 16666, 15384, 14285, 13333,
      ],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.2,
    },
  ],
};

export type UniswapPriceCurveProps = {
  className?: string;
};

export function UniswapPriceCurve(props: UniswapPriceCurveProps) {
  return (
    <div className={props.className}>
      <Line options={options} data={data} />
    </div>
  );
}
