"use client";

import Topic from "@/components/Topic";

import { AppContext } from "@/app/contexts/AppContextProvider";
import { getSlippageAndImpactTopic } from "@/app/data/staticDataService";
import React, { useEffect } from "react";

const PricingSlippageAndImpact: React.FC = () => {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const slippageAndImpactTopic = getSlippageAndImpactTopic();
  useEffect(() => {
    setCurrentTopic(slippageAndImpactTopic);
  });

  const section1 = {
    subtitle: "Pricing Slippage",
    contents: [
      `When you swap tokens on a decentralized exchange, two important concepts to understand are price slippage and price impact.`,
      `Price slippage happens due to other trades executing between the time you place your order and when it's executed.`,
      `Price slippage is the difference between the expected price of your trade and the actual price at which the trade is executed.`,
    ],
  };

  const section2 = {
    contents: [
      `Imagine you want to swap ETH for USDC and the exchange has just 2 users. At the time you initiate the trade, the price is 1 ETH = 2,000 USDC.`,
      `Meanwhile, another user swaps some ETH for USDC just before your trade. 
      This trade has changed the price to 1 ETH = 1,990 USDC. When your trade is executed you will get less USDC than you expected.`,
      {
        className: "mt-5",
        question: "This means the price slippage is:",
        answers: ["2,000", "1,990", "10", "2,010"],
        correctAnswerIndex: 2,
      },
    ],
  };

  const section3 = {
    contents: [
      `In this case, the slippage is a 10 USDC loss for you, which could be expressed as a small percentage (0.5%) of the total trade value.`,
      `Slippage is often expressed as a percentage, indicating how much less you might receive compared to your expected price.`,
    ],
  };

  return (
    <Topic
      topic={slippageAndImpactTopic}
      sections={[section1, section2, section3]}
    />
  );
};

export default PricingSlippageAndImpact;
