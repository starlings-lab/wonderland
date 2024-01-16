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
      This trade has changed the price to 1 ETH = 1,990 USDC.
      When your trade is executed you will get less USDC than you expected.`,
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
      `In this case, the slippage is a 10 USDC loss for you, which could be expressed as a small percentage (0.5%) of the price.`,
      `Slippage is often expressed as a percentage, indicating how much less you might receive compared to your expected price.`,
      ``, // adding empty string to add a new line
    ],
  };

  const section4 = {
    subtitle: "Pricing Impact",
    contents: [
      `Price impact refers to the influence that your trade has on the price of a token. `,
      `Price impact depends on the size of your trade relative to the total available capital in the exchange.`,
      `The bigger your trade, the more potential it has to impact the market price of the token.`,
    ],
  };

  const section5 = {
    contents: [
      `Now, consider you're making a very large trade, like swapping 1000 ETH for USDC. The current price is 1 ETH = 2,000 USDC.`,
      `However, due to your trade's substantial size in comparison to the exchange's available USDC capital,
      it significantly affects the market price.
      The large withdrawal of USDC in exchange for ETH decreases the USDC supply relative to ETH,
      leading to a decrease in the price of ETH in terms of USDC.`,
      `As a result, the price you get is 1 ETH = 1950 USDC`,
      {
        className: "mt-5",
        question: "This means the price impact is:",
        answers: ["2,050", "1,950", "2,000", "50"],
        correctAnswerIndex: 3,
      },
    ],
  };

  const section6 = {
    contents: [
      `In this case, the price impact is a 50 USDC loss for you, which could be expressed as a small percentage (2.5%) of the price.`,
      `The price impact is often expressed as a percentage, indicating how much less you might receive compared to your expected price.`,
    ],
  };

  return (
    <Topic
      topic={slippageAndImpactTopic}
      sections={[section1, section2, section3, section4, section5, section6]}
    />
  );
};

export default PricingSlippageAndImpact;
