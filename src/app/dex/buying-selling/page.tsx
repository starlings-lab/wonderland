"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { AppContext } from "../../contexts/AppContextProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuyUSDC } from "@/components/BuyUSDC";
import { useRouter } from "next/navigation";

export default function BuyingSelling() {
  const router = useRouter();
  const { setCurrentChapter, setCurrentProgress } =
    React.useContext(AppContext)!;

  // state to show/hide question content
  const totalQuestions = 5;
  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [usdcBuyAmt, setUsdcBuyAmt] = React.useState(0);

  useEffect(() => {
    setCurrentChapter("BuyingSelling");
    setCurrentProgress((currentQuestion / totalQuestions) * 100);
  });

  const onContinue = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentProgress((nextQuestion / totalQuestions) * 100);

    // route to review page when currentQuestion is the last question
    if (nextQuestion >= totalQuestions) {
      router.push("/dex/buying-selling/review");
    }

    // scroll to question 2 content
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const onBuyUsdc = (usdcBuyAmt: number) => {
    setUsdcBuyAmt(usdcBuyAmt);
    onContinue();
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Buying & Selling</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              Exchanges are the place where you can buy or sell one currency
              with another currency. Usually, there is a company in the middle
              who facilitates this trade. If you want to buy currency A for
              currency B, you send currency B to the company. The company finds
              the seller for the currency A, and then send the currency A to
              you.
            </div>
            <div className="flex justify-center p-1">
              <Image
                src="/images/buying-selling.png"
                alt="Image"
                width={260}
                height={194}
              />
            </div>
          </div>

          {currentQuestion >= 2 && (
            <div>
              <div>
                Decentralized exchanges allow you to buy or sell
                cryptocurrencies with no one in the middle. If you want to buy
                cryptocurrency A for cryptocurrency B, you send cryptocurrency B
                and get cryptocurrency A back. There is no company in the
                middle.
              </div>
              <div className="flex justify-center p-1">
                <Image
                  src="/images/buying-selling.png"
                  alt="Image"
                  width={260}
                  height={194}
                />
              </div>
            </div>
          )}

          {currentQuestion >= 3 && (
            <>
              <div className="mt-5">
                Let&apos;s try to buy one cryptocurrency with another. You have
                1 ETH which is one of the biggest cryptocurrencies. And you want
                to buy USDC which is a cryptocurrency that has the same value
                with USD.
              </div>
              <div className="mt-3 mb-5">Click on the buy button below</div>
              <div className="flex justify-center pl-20 pr-20 w-full">
                <BuyUSDC onBuy={onBuyUsdc} />
              </div>
            </>
          )}

          {currentQuestion >= 4 && (
            <>
              <div className="mt-3 mb-5">Now you have {usdcBuyAmt} USDC!</div>
              <div>
                But how did they calculate the price with no one in the middle?
                We’ll talk about that in the next chapter!
              </div>
            </>
          )}

          {currentQuestion < totalQuestions && currentQuestion !== 3 && (
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
}
