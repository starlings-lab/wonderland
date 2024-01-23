"use client";

import Topic from "@/components/Topic";

import { AppContext } from "@/app/contexts/AppContextProvider";
import { getPricingTopic } from "@/app/data/staticDataService";
import React, { useEffect } from "react";
import { UniswapPriceCurve } from "@/components/UniswapPriceCurve";

const Pricing: React.FC = () => {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const pricingTopic = getPricingTopic();
  useEffect(() => {
    setCurrentTopic(pricingTopic);
  });

  const section1 = {
    contents: [
      `In the previous chapter, we learned about decentralized exchanges, which allow you to trade cryptocurrencies without intermediaries.`,
      `Now, let's explore how these exchanges determine the amount you receive when buying or selling. This process is automated and relies on certain values within the exchange.`,
      `Different decentralized exchanges have unique systems for determining these amounts. To illustrate, let's consider Uniswap, the largest decentralized exchange.`,
    ],
  };

  const section2 = {
    contents: [
      `A decentralized exchange pools cryptocurrencies that people can exchange(in the next chapter, we'll discuss where this pool of capital comes from.) `,
      {
        src: "/images/pricing-1.png",
        width: 400,
        height: 156,
      },
      `In the example above, there are 10 ETH and 20,000 USDC that can be
      used for exchange in Uniswap.`,
      `Uniswap makes sure that they always get the constant value when
      they multiply the quantity of ETH and USDC.`,
      `In this case, they make sure that it is always 200,000 (<code>10 * 20000</code>).`,
      {
        children: (
          <div className="mt-8">
            <UniswapPriceCurve />
          </div>
        ),
      },
    ],
    needsContinuation: true,
  };

  const section = {
    contents: [
      `Let's imagine the case where Alice wants to buy USDC for 1 ETH.`,
      {
        src: "/images/pricing-2.png",
        width: 525,
        height: 156,
      },
      `She sells 1 ETH to the exchange. Then the exchange has 11 ETH and
      20,000 USDC.`,
      `However, at this point, <code>11 * 20000 != 200000</code>`,
      `So the exchange needs to change the quantity of USDC they have.`,
      `When one quantity changes, the other quantity needs to be changed.
      If the quantity of USDC is x, the exchange wants to ensure
      that:
      <code>11 * x = 200000</code>`,
      {
        className: "mt-5",
        question: "This means:",
        answers: ["x = 18,181", "x = 20,000", "x = 200,000", "x = 1,820"],
        correctAnswerIndex: 0,
      },
    ],
  };

  const section4 = {
    contents: [
      `Since <code>x = 200000 / 11</code>, the x, the quantity of USDC in the
      exchange should be approximately 18,181.`,
      `Now, since we know that we need to keep only 18,181 in the
      exchange, we can send some USDC back to Alice.`,
      {
        className: "mt-5",
        question: "Alice will get:",
        answers: ["1,800 USDC", "1,819 USDC", "1,000 USDC", "1,100 USDC"],
        correctAnswerIndex: 1,
      },
    ],
  };

  const section5 = {
    contents: [
      `Since the exchange needs to have only 18,181, you can say that
      <code>20000 - 18181 = 1819</code> can be sent back to Alice.`,
      {
        src: "/images/pricing-3.png",
        width: 525,
        height: 156,
      },
      `In this way, the exchange can keep the original value of 200,000
      constant when they multiply the quantity of ETH and USDC.`,
      `<pre><code>11 * 1819 = 200000</code></pre>`,
      `Sure, <code>11 * 1819</code> is not exactly 200,000, and financial math can not
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
