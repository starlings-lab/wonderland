"use client";
import React, { useEffect } from "react";

import { getBuyingPlaygroundTopic } from "@/app/data/staticDataService";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { UniswapPoolBalanceChart } from "@/components/UniswapPoolBalanceChart";
import UniswapSwap from "@/components/UniswapSwap";
import Topic from "@/components/Topic";

export default function BuyingPlayground() {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const buyingPlaygroundTopic = getBuyingPlaygroundTopic();

  useEffect(() => {
    setCurrentTopic(buyingPlaygroundTopic);
  });

  const section1 = {
    contents: [
      `We prepared a dummy decentralized exchange that simulates the real
      Uniswap exchange.`,
      `Click on “Start Playing!” button to start!`,
    ],
  };

  const section2 = {
    contents: [
      `Buy ETH or USDC in the widget on the right.`,
      `You can see how pool balance, your ETH and USDC balance, and the
      price changes as you buy.`,
      {
        children: (
          <div className="mt-8">
            <UniswapPoolBalanceChart
              titleOptions={{ text: "Uniswap ETH-USDC Pool Balance" }}
            />
            <UniswapSwap />
          </div>
        ),
      },
    ],
  };

  return (
    <Topic
      topic={buyingPlaygroundTopic}
      sections={[section1, section2]}
      buttonLabel="Start Playing"
      disableReview={true}
    />
  );
}
