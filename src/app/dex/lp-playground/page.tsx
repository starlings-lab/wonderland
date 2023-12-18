"use client";
import React, { useEffect } from "react";

import Topic from "@/components/Topic";
import { getLPPlaygroundTopic } from "@/app/data/staticDataService";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { UniswapPoolBalanceChart } from "@/components/UniswapPoolBalanceChart";
import UniswapAddLiquidity from "@/components/UniswapAddLiquidity";
import dynamic from "next/dynamic";

const ReviewCard = dynamic(() => import("@/components/ReviewCard"), {
  ssr: false,
});

export default function BuyingSelling() {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [supplyAttempt, setSupplyAttempt] = React.useState(0);

  const lpPlaygroundTopic = getLPPlaygroundTopic();
  useEffect(() => {
    if (currentQuestion > 1 && supplyAttempt > 0) {
      return;
    }

    console.log("set current topic to lp playground");
    setCurrentTopic(lpPlaygroundTopic);
  });

  const section1 = {
    contents: [
      `We prepared a dummy decentralized exchange that simulates the real Uniswap exchange.`,
      `Click on “Start Playing!” button to start!`,
    ],
  };

  const section2 = {
    contents: [
      `Add liquidity in the widget on the right.`,
      `You can see how your balance and pool balance change.`,
      `There are 10,000,000 ETH and 40,000,000 USDC in this Uniswap exchange.`,
      {
        children: (
          <div className="mt-8">
            <UniswapPoolBalanceChart
              titleOptions={{
                text: "Uniswap ETH-USDC Pool Balance",
              }}
            />
            <UniswapAddLiquidity
              onSupply={() => setSupplyAttempt(supplyAttempt + 1)}
            />
          </div>
        ),
      },
    ],
  };

  return (
    <>
      <Topic
        topic={lpPlaygroundTopic}
        sections={[section1, section2]}
        buttonLabel="Start Playing"
        disableReview={true}
        onNextQuestion={(nextQuestion) => setCurrentQuestion(nextQuestion)}
      />
      {currentQuestion > 1 && supplyAttempt > 0 && (
        <ReviewCard nextTopicIndex={5}>{}</ReviewCard>
      )}
    </>
  );
}
