"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";

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
                exchange(in the next chapter, we&apos;ll discuss where this pool
                of capital comes from.)
              </div>
              <div className="flex justify-center p-1 mt-5">
                <Image
                  src="/images/pricing-eth-dai.png"
                  alt="Image"
                  width={286}
                  height={178}
                />
              </div>
              <div className="mt-5">
                In the example above, there are 10 ETH and 2000 USDC that can be
                used for exchange in Uniswap.
              </div>
              <div className="mt-5">
                Uniswap makes sure that they always get the constant value when
                they multiply the quantity of ETH and USDC. In this case, they
                make sure that it is always 20,000.
              </div>
              <div className="mt-5">
                In this case, they make sure that it is always 20,000.
              </div>
            </div>
          )}
          {currentQuestion >= 3 && (
            <div>
              <div className="mt-5">
                Let’s imagine the case where Alice wants to buy USDC for 1 ETH.
              </div>
              <div className="flex justify-center p-1 mt-5 mb-5">
                <Image
                  src="/images/pricing-uniswap.png"
                  alt="Image"
                  width={286}
                  height={178}
                />
              </div>
              <div className="mt-5">
                She sells 1 ETH to the exchange. Then the exchange has 11 ETH
                and 2000 USDC.
              </div>
              <div className="mt-5">
                However, at this point, 11 * 2000 != 20000.
              </div>
              <div className="mt-5">
                So the exchange needs to change the quantity of USDC they have.
              </div>
              <div className="mt-5">
                If the quantity of USDC is x, the exchange wants to make sure
                that: 11 * x = 20000
              </div>
              <MultipleChoiceQuiz
                className="mt-5"
                question="This means:"
                answers={["x = 1818", "x = 2000", "x = 20000", "x = 182"]}
                correctAnswerIndex={0}
                onCorrectAnswer={onContinue}
                onSkip={onContinue}
              />
            </div>
          )}
          {currentQuestion >= 4 && (
            <div>
              <div className="mt-5">
                Since x = 20000 / 11, the x, the quantity of USDC in the
                exchange should be approximately 1818.
              </div>

              <div className="mt-5">
                Now, since we know that we need to keep only 1818 in the
                exchange, we can send some USDC back to Alice.
              </div>
              <MultipleChoiceQuiz
                className="mt-5"
                question="Alice will get:"
                answers={["1818 USDC", "182 USDC", "100 USDC", "11 USDC"]}
                correctAnswerIndex={1}
                onCorrectAnswer={onContinue}
                onSkip={onContinue}
              />
            </div>
          )}
          {currentQuestion >= 5 && (
            <div>
              <div className="mt-5">
                Since the exchange needs to have only 1818, you can say that
                2000 - 1818 = 182 can be sent back to Alice.
              </div>
              <div className="flex justify-center p-1 mt-5 mb-5">
                <Image
                  src="/images/pricing-uniswap-2.png"
                  alt="Image"
                  width={460}
                  height={178}
                />
              </div>
              <div className="mt-5">
                In this way, the exchange can keep the original value of 20000
                constant when they multiply the quantity of ETH and USDC.
              </div>
              <div className="mt-5">11 * 1818 = 20000</div>
              <div className="mt-5">
                Sure, 11 * 1818 is not exactly 20000, and financial math can not
                be approximated in practice. But you get the basic idea. 🙂
              </div>
            </div>
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
