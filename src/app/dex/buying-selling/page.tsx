"use client";
import React, { useEffect } from "react";

import BuyUSDC from "@/components/BuyUSDC";
import Topic from "@/components/Topic";
import { getBuyingSellingTopic } from "@/app/data/staticDataService";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { formatFloat } from "@/lib/utils";

export default function BuyingSelling() {
  const { setCurrentTopic, completedTopics } = React.useContext(AppContext)!;
  const bsTopic = getBuyingSellingTopic();
  useEffect(() => {
    if (!completedTopics.includes(bsTopic)) {
      setCurrentTopic(bsTopic);
    }
  });

  const [usdcBuyAmt, setUsdcBuyAmt] = React.useState(0);

  const onBuyUsdc = (usdcBuyAmt: number) => {
    setUsdcBuyAmt(usdcBuyAmt);
  };

  const section1 = {
    contents: [
      `Exchanges are the place where you can buy or sell one currency with another currency. 
      Usually, there is a company in the middle who facilitates this trade.
      If you want to buy currency A for currency B, you send currency B to the company.
      The company finds the seller for the currency A, and then send the currency A to you.`,
      {
        src: "/images/exchange.png",
        width: 260,
        height: 194,
      },
    ],
  };

  const section2 = {
    contents: [
      `Decentralized exchanges allow you to buy or sell cryptocurrencies with no one in the middle. If you want to buy cryptocurrency A for cryptocurrency B, you just send cryptocurrency B to the blockchain and get cryptocurrency A back. 
      `,
      {
        src: "/images/dex.png",
        width: 260,
        height: 194,
      },
    ],
  };

  const section3 = {
    contents: [
      `Let's try to buy one cryptocurrency with another.
      You have 1 ETH which is one of the biggest cryptocurrencies. And you want to buy USDC
      which is a cryptocurrency that has the same value with USD.`,
      `Click on the buy button below.`,
      {
        children: (
          <div className="flex justify-center pl-24 pr-24 w-full mt-8">
            <BuyUSDC onBuy={onBuyUsdc} />
          </div>
        ),
      },
    ],
  };

  const section4 = {
    contents: [
      `Now you have ${formatFloat(usdcBuyAmt, 0)} USDC!`,
      `But how did they calculate the price with no one in the middle?
      We'll talk about that in the next chapter!`,
    ],
  };

  return (
    <Topic
      topic={bsTopic}
      sections={[section1, section2, section3, section4]}
    />
  );
}
