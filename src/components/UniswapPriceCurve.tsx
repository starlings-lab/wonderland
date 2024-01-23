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

// constant K = 200,000 for ETH-USDC price curve
const K = 200000;

// create labels for range of ETH quantities
const ETH_QUANTITY = 20;
const labels = Array.from(Array(ETH_QUANTITY).keys()).map((i) => i + 1);

const data = {
  labels,
  datasets: [
    {
      label: "ETH-USDC",
      // array of USDC qty for each ETH qty
      data: labels.map((i) => K / i),
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
