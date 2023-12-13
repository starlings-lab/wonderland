"use client";

import Topic from "@/components/Topic";

import { AppContext } from "@/app/contexts/AppContextProvider";
import { getPricingTopic } from "@/app/data/staticDataService";
import React, { useEffect } from "react";

const Pricing: React.FC = () => {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const pricingTopic = getPricingTopic();
  useEffect(() => {
    setCurrentTopic(pricingTopic);
  });

  const section1 = {
    contents: [
      `In the previous chapter, we learned that a decentralized exchange
    is a place where you can buy and sell cryptocurrencies with no one
    in the middle.`,
      `But how do they determine how much you can get when
    you buy or sell?They achieve this automatically by looking at some
    values in the exchange.`,
      `Each decentralized exchange has a
    different system for this, and we will take an example of Uniswap,
    which is the biggest decentralized exchange.`,
    ],
  };

  const section2 = {
    contents: [
      `Decentralized exchange pool cryptocurrencies that people can
      exchange(in the next chapter, we&apos;ll discuss where this pool
      of capital comes from.)`,
      {
        src: "/images/pricing-eth-dai.png",
        width: 286,
        height: 178,
      },
      `In the example above, there are 10 ETH and 2000 USDC that can be
      used for exchange in Uniswap.`,
      `Uniswap makes sure that they always get the constant value when
      they multiply the quantity of ETH and USDC.`,
      `In this case, they make sure that it is always 20,000.`,
    ],
  };

  const section = {
    contents: [
      `Let's imagine the case where Alice wants to buy USDC for 1 ETH.`,
      {
        src: "/images/pricing-uniswap.png",
        width: 286,
        height: 178,
      },
      `She sells 1 ETH to the exchange. Then the exchange has 11 ETH and
      2000 USDC.`,
      `However, at this point, 11 * 2000 != 20000.`,
      `So the exchange needs to change the quantity of USDC they have.`,
      `If the quantity of USDC is x, the exchange wants to make sure
      that: 11 * x = 20000`,
      {
        className: "mt-5",
        question: "This means:",
        answers: ["x = 1818", "x = 2000", "x = 20000", "x = 182"],
        correctAnswerIndex: 0,
      },
    ],
  };

  const section4 = {
    contents: [
      `Since x = 20000 / 11, the x, the quantity of USDC in the
      exchange should be approximately 1818.`,
      `Now, since we know that we need to keep only 1818 in the
      exchange, we can send some USDC back to Alice.`,
      {
        className: "mt-5",
        question: "Alice will get:",
        answers: ["1818 USDC", "182 USDC", "100 USDC", "11 USDC"],
        correctAnswerIndex: 1,
      },
    ],
  };

  const section5 = {
    contents: [
      `Since the exchange needs to have only 1818, you can say that
      2000 - 1818 = 182 can be sent back to Alice.`,
      {
        src: "/images/pricing-uniswap-2.png",
        width: 460,
        height: 178,
      },
      `In this way, the exchange can keep the original value of 20000
      constant when they multiply the quantity of ETH and USDC.`,
      `11 * 1818 = 20000`,
      `Sure, 11 * 1818 is not exactly 20000, and financial math can not
      be approximated in practice. But you get the basic idea. 🙂`,
    ],
  };

  return (
    <Topic
      topic={pricingTopic}
      sections={[section1, section2, section, section4, section5]}
    />
  );
};

export default Pricing;
