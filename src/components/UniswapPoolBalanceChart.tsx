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
import useEthBalance from "@/hooks/useEthBalance";
import useUsdcBalance from "@/hooks/useUsdcBalance";
import { UNISWAP_V1_USDC_EXCHANGE_ADDRESS } from "../contracts/uniswap-v1-usdc-exchange";

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
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      max: 150,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      max: 150000000,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
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

export type UniswapPoolBalanceChartProps = {
  className?: string;
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  titleOptions?: object;
  ethBalance?: number;
  usdcBalance?: number;
};

export function UniswapPoolBalanceChart(props: UniswapPoolBalanceChartProps) {
  options.maintainAspectRatio = !!props.maintainAspectRatio
    ? props.maintainAspectRatio
    : true;
  options.aspectRatio = !!props.aspectRatio ? props.aspectRatio : 1;

  // spread props.titleOptions to options.title
  options.plugins!.title = {
    ...options.plugins!.title,
    ...props.titleOptions,
  };

  const [ethBalance] = useEthBalance(UNISWAP_V1_USDC_EXCHANGE_ADDRESS);
  const [usdcBalance] = useUsdcBalance(UNISWAP_V1_USDC_EXCHANGE_ADDRESS);

  const labels = [""];
  const data = {
    labels,
    datasets: [
      {
        label: "ETH",
        data: [props.ethBalance ? props.ethBalance : ethBalance],
        backgroundColor: "#FF4081",
        yAxisID: "y",
      },
      {
        label: "USDC",
        data: [props.usdcBalance ?? usdcBalance],
        backgroundColor: "#FFC107",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className={props.className}>
      <Bar options={options} data={data} />
    </div>
  );
}
