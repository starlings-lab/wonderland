"use client";
import React, { useEffect } from "react";

import Topic from "@/components/Topic";
import { UniswapPoolBalanceChart } from "@/components/UniswapPoolBalanceChart";
import AddLiquidity from "@/components/AddLiquidity";
import { getLPTopic } from "@/app/data/staticDataService";
import { AppContext } from "@/app/contexts/AppContextProvider";

export default function LiquidityProvision() {
  const [ethBalance, setEthBalance] = React.useState(10000);
  const [usdcBalance, setUsdcBalance] = React.useState(40000);

  const { setCurrentTopic } = React.useContext(AppContext)!;
  const lpTopic = getLPTopic();
  useEffect(() => {
    setCurrentTopic(lpTopic);
  });

  const onLiquidityAdded = (ethInput: number, usdcInput: number) => {
    // Update the pool balance chart
    setEthBalance(ethBalance + ethInput);
    setUsdcBalance(usdcBalance + usdcInput);
  };

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
      {
        children: (
          <div className="flex mt-8 space-x-6">
            <div className="">
              <UniswapPoolBalanceChart
                ethBalance={ethBalance}
                usdcBalance={usdcBalance}
                titleOptions={{ text: "Pool Balance" }}
              />
            </div>
            <AddLiquidity onLiquidityAdded={onLiquidityAdded} />
          </div>
        ),
      },
    ],
  };

  const section4 = {
    contents: [
      `Great! You supplied 10 ETH and 1820 USDC and the pool balance increased.`,
      `When you provide liquidity, you need to provide the same value of two
      currencies because the price will change otherwise. In the above scenario,
      1 ETH was 182 USDC. That’s why you had to provide 1820 USDC to provide
      10 ETH together.`,
      `Imagine you want to provide 100 ETH and 1 ETH is 400 USDC.`,
      `How much USDC will you be providing? `,
      {
        className: "mt-5",
        question: "You will provide:",
        answers: ["40,000 USDC", "1 USDC", "4000 USDC", "0 USDC"],
        correctAnswerIndex: 0,
      },
    ],
  };

  const section5 = {
    contents: [
      `Since you want to provide 100 ETH and you are required to provide 
      the same value of the other currency, when 1 ETH is 400 USDC,
      you need to provide 100 * 400 = 40,000 USDC.`,
    ],
  };

  return (
    <Topic
      topic={lpTopic}
      sections={[section1, section2, section3, section4, section5]}
    />
  );
}
