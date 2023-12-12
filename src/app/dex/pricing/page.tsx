"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { useRouter } from "next/navigation";
import ContentSection, { Content } from "@/components/ContentSection";

const Pricing: React.FC = () => {
  const router = useRouter();
  const { setCurrentChapter, setCurrentProgress } =
    React.useContext(AppContext)!;

  // state to show/hide question content
  const totalQuestions = 6;
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  useEffect(() => {
    setCurrentChapter("Pricing");
    setCurrentProgress((currentQuestion / totalQuestions) * 100);
  });

  const onContinue = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentProgress((nextQuestion / totalQuestions) * 100);

    // route to review page when currentQuestion is the last question
    if (nextQuestion >= totalQuestions) {
      router.push("/dex/pricing/review");
    }

    // scroll to end of content
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const section1Content: string[] = [
    `In the previous chapter, we learned that a decentralized exchange
    is a place where you can buy and sell cryptocurrencies with no one
    in the middle. But how do they determine how much you can get when
    you buy or sell?They achieve this automatically by looking at some
    values in the exchange. Each decentralized exchange has a
    different system for this, and we will take an example of Uniswap,
    which is the biggest decentralized exchange.`,
    `But how do they determine how much you can get when you buy or
    sell?They achieve this automatically by looking at some values in
    the exchange. Each decentralized exchange has a different system
    for this, and we will take an example of Uniswap, which is the
    biggest decentralized exchange.`,
    `Each decentralized exchange has a different system for this, and
    we will take an example of Uniswap, which is the biggest
    decentralized exchange.
    `,
  ];

  const section2Content: Content[] = [
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
    they multiply the quantity of ETH and USDC. In this case, they
    make sure that it is always 20,000.`,
    `In this case, they make sure that it is always 20,000.`,
  ];

  const section3Content: Content[] = [
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
      onCorrectAnswer: onContinue,
      onSkip: onContinue,
    },
  ];

  const section4Content: Content[] = [
    `Since x = 20000 / 11, the x, the quantity of USDC in the
    exchange should be approximately 1818.`,
    `Now, since we know that we need to keep only 1818 in the
    exchange, we can send some USDC back to Alice.`,
    {
      className: "mt-5",
      question: "Alice will get:",
      answers: ["1818 USDC", "182 USDC", "100 USDC", "11 USDC"],
      correctAnswerIndex: 1,
      onCorrectAnswer: onContinue,
      onSkip: onContinue,
    },
  ];

  const section5Content: Content[] = [
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
  ];

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentSection contents={section1Content}></ContentSection>
          {currentQuestion >= 2 && (
            <ContentSection contents={section2Content}></ContentSection>
          )}
          {currentQuestion >= 3 && (
            <ContentSection contents={section3Content} />
          )}
          {currentQuestion >= 4 && (
            <ContentSection contents={section4Content} />
          )}
          {currentQuestion >= 5 && (
            <ContentSection contents={section5Content} />
          )}
          {currentQuestion < totalQuestions &&
            currentQuestion !== 3 &&
            currentQuestion !== 4 && (
              <div className="flex flex-row justify-center items-center">
                <Button className="mt-5" onClick={onContinue}>
                  Continue
                </Button>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;
