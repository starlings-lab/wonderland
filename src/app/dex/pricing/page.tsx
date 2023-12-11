"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <>
            <div className="mb-5">
              In the previous chapter, we learned that a decentralized exchange
              is a place where you can buy and sell cryptocurrencies with no one
              in the middle. But how do they determine how much you can get when
              you buy or sell?They achieve this automatically by looking at some
              values in the exchange. Each decentralized exchange has a
              different system for this, and we will take an example of Uniswap,
              which is the biggest decentralized exchange.
            </div>
            <div className="mb-5">
              But how do they determine how much you can get when you buy or
              sell?They achieve this automatically by looking at some values in
              the exchange. Each decentralized exchange has a different system
              for this, and we will take an example of Uniswap, which is the
              biggest decentralized exchange.
            </div>
            <div className="mb-5">
              Each decentralized exchange has a different system for this, and
              we will take an example of Uniswap, which is the biggest
              decentralized exchange.
            </div>
          </>
          {currentQuestion >= 2 && (
            <div>
              <div>
                Decentralized exchange pool cryptocurrencies that people can
                exchange(in the next chapter, we'll discuss where this pool of
                capital comes from.)
              </div>
              <div className="flex justify-center p-1 mt-5 mb-5">
                <Image
                  src="/images/pricing-eth-dai.png"
                  alt="Image"
                  width={286}
                  height={178}
                />
              </div>
            </div>
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
};

export default Pricing;
