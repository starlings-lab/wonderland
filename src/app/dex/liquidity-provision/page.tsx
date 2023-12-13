"use client";
import React from "react";

import Topic from "@/components/Topic";

export default function LiquidityProvision() {
  const section1 = {
    contents: [
      `We learned that you can buy cryptocurrencies from pool of capital in a 
      decentralized exchange based their pricing.`,
      `But where does the capital come from?`,
    ],
  };

  const section2 = {
    contents: [
      `Anyone in the world(including you!) can deposit capital to a decentralized exchange like Uniswap without asking for permission.`,
      `They are called liquidity providers.`,
    ],
  };

  const section3 = {
    contents: [
      `Let's try to provide liquidity of ETH and USDC.`,
      `Click on the "Supply" button below.`,
    ],
  };

  const section4 = {
    contents: [],
  };

  return (
    <Topic
      title="Liquidity Provision"
      sections={[section1, section2, section3, section4]}
    />
  );
}
