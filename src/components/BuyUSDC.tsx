import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { on } from "events";

export interface BuyUSDCProps {
  onBuy?: (usdcBuyAmt: number) => void;
  className?: string;
  buyBtnRef: React.Ref<HTMLDivElement>;
}

export function BuyUSDC(props: BuyUSDCProps) {
  const [ethBalance, setEthBalance] = useState(1);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [ethSellAmt, setEthSellAmt] = useState(1);
  const [usdcBuyAmt, setUsdcBuyAmt] = useState(182);
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
  };

  return (
    <Card className="w-[80%]">
      <CardHeader className="p-3">
        <div className="flex flex-row w-full">
          <div className="w-2/3 font-semibold text-right">Buy USDC</div>
          <X size={24} className="ml-auto" />
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
            <div className="text-sm ml-1">Your ETH Balance: {ethBalance}</div>
          </div>
          <div className="flex flex-row mt-1">
            <Image src="/images/usdc.png" alt="USDC" width={16} height={16} />
            <div className="text-sm ml-1">Your USDC Balance: {usdcBalance}</div>
          </div>
        </div>
        <div className="mb-4 mt-5">
          <div className="text-sm text-gray-500">You Sell</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg">{ethSellAmt} ETH</div>
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
            <div className="text-lg">{usdcBuyAmt} USDC</div>
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
          ref={props.buyBtnRef}
          disabled={isButtonDisabled}
          className="w-full bg-[#FF4081] hover:bg-pink-600 text-white font-bold rounded-lg"
          onClick={onSellEth}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
