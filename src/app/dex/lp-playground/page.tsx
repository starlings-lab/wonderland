"use client";
import React, { useEffect } from "react";

import Topic from "@/components/Topic";
import { getLPPlaygroundTopic } from "@/app/data/staticDataService";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { UniswapPoolBalanceChart } from "@/components/UniswapPoolBalanceChart";
import UniswapAddLiquidity from "@/components/UniswapAddLiquidity";

export default function BuyingSelling() {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const lpPlaygroundTopic = getLPPlaygroundTopic();
  useEffect(() => {
    setCurrentTopic(lpPlaygroundTopic);
  });

  const section1 = {
    contents: [
      `We prepared a dummy decentralized exchange that simulates the real Uniswap exchange.`,
      `Click on “Start Playing!” button to start!`,
    ],
  };

  const data = {
    labels: [""],
    datasets: [
      {
        label: "ETH",
        data: [10000000],
        backgroundColor: "#FF4081",
        barPercentage: 0.4,
      },
      {
        label: "USDC",
        data: [40000000],
        backgroundColor: "#FFC107",
        barPercentage: 0.4,
      },
    ],
  };

  const chartTitle =
    "There are 10,000,000 ETH and 40,000,000 USDC in this Uniswap exchange.";
  const section2 = {
    contents: [
      `Add liquidity in the widget on the right.`,
      `You can see how your balance and pool balance change.`,
      `There are 10,000,000 ETH and 40,000,000 USDC in this Uniswap exchange.`,
      {
        children: (
          // <div className="flex mt-8 space-x-4">
          <div className="mt-8">
            <UniswapPoolBalanceChart
              data={data}
              titleOptions={{
                text: chartTitle,
                font: {
                  size: 12,
                },
              }}
            />
            <UniswapAddLiquidity />
          </div>
        ),
      },
    ],
  };

  return (
    <Topic
      topic={lpPlaygroundTopic}
      sections={[section1, section2]}
      buttonLabel="Start Playing"
      disableReview={true}
    />
  );
}
