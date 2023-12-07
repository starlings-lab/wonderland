"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { AppContext } from "../../contexts/AppContextProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BuyingSelling: React.FC<void> = () => {
  const { setCurrentChapter, setCurrentProgress } =
    React.useContext(AppContext)!;

  // state to show/hide question content
  const totalQuestions = 4;
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  useEffect(() => {
    setCurrentChapter("BuyingSelling");
    setCurrentProgress((currentQuestion / totalQuestions) * 100);
  });

  const onContinue = () => {
    const nextQuestion = currentQuestion + 1;
    console.log("nextQuestion", nextQuestion);
    setCurrentQuestion(nextQuestion);
    setCurrentProgress((nextQuestion / totalQuestions) * 100);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="max-w-xl h-fit mt-5">
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
                src="/buying-selling.png"
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
                  src="/buying-selling.png"
                  alt="Image"
                  width={260}
                  height={194}
                />
              </div>
            </div>
          )}

          {currentQuestion >= 3 && (
            <div className="mt-5">
              Let's try to buy one cryptocurrency with another. You have 1 ETH
              which is one of the biggest cryptocurrencies. And you want to buy
              USDC which is a cryptocurrency that has the same value with USD.
            </div>
          )}

          {currentQuestion <= totalQuestions && (
            <Button className="mt-5" onClick={onContinue}>
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
      {/* <Card className="max-w-xl h-fit mt-5">
        <CardContent></CardContent>
      </Card> */}
    </main>
  );
};

export default BuyingSelling;
