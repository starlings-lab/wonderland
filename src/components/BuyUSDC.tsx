"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import TopicContext from "@/app/contexts/TopicContext";
import { formatFloat } from "@/lib/utils";

export interface BuyUSDCProps {
  onBuy?: (usdcBuyAmt: number) => void;
  className?: string;
  onContinue?: () => void;
}

const BuyUSDC: React.FC<BuyUSDCProps> = (props: BuyUSDCProps) => {
  const chapterContext = React.useContext(TopicContext);

  const [ethBalance, setEthBalance] = useState(1);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [ethSellAmt, setEthSellAmt] = useState(1);
  const [usdcBuyAmt, setUsdcBuyAmt] = useState(2000);
  const [buttonLabel, setButtonLabel] = useState("Buy");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSellEth = () => {
    setEthBalance(ethBalance - ethSellAmt);
    setUsdcBalance(usdcBalance + usdcBuyAmt);
    setEthSellAmt(0);
    setButtonLabel("Success!");
    props.onBuy && props.onBuy(usdcBuyAmt);
    setUsdcBuyAmt(0);
    setIsButtonDisabled(true);

    chapterContext && chapterContext.onContinue && chapterContext.onContinue();
  };

  return (
    <Card className="w-[100%]">
      <CardHeader className="p-3">
        <div className="flex justify-center items-center w-full">
          <div className="font-semibold text-right">Buy USDC</div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col mb-5 p-2 rounded-lg bg-[#F5F6FC]">
          <div className="flex flex-row">
            <Image
              src="/images/ethereum.png"
              alt="ETH"
              width={16}
              height={16}
            />
            <div className="text-sm ml-1">
              Your ETH Balance: {formatFloat(ethBalance)}
            </div>
          </div>
          <div className="flex flex-row mt-1">
            <Image src="/images/usdc.png" alt="USDC" width={16} height={16} />
            <div className="text-sm ml-1">
              Your USDC Balance: {formatFloat(usdcBalance)}
            </div>
          </div>
        </div>
        <div className="mb-4 mt-5">
          <div className="text-sm text-gray-500">You Sell</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg">{formatFloat(ethSellAmt)} ETH</div>
            <Image
              id="eth"
              src="/images/ethereum.png"
              alt="ETH"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="mb-4 mt-5">
          <div className="text-sm text-gray-500">You Get</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg">{formatFloat(usdcBuyAmt)} USDC</div>
            <Image
              id="eth"
              src="/images/usdc.png"
              alt="ETH"
              width={36}
              height={36}
            />
          </div>
        </div>
        <Button
          disabled={isButtonDisabled}
          className="w-full bg-[#FF4081] hover:bg-pink-600 text-white font-bold rounded-lg"
          onClick={onSellEth}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BuyUSDC;
