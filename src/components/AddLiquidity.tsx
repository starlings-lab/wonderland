"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import TopicContext from "@/app/contexts/TopicContext";
import { cn } from "@/lib/utils";

export interface AddLiquidityProps {
  onSupply?: (ethAmt: number, usdcAmt: number) => void;
  className?: string;
  onContinue?: () => void;
}

const AddLiquidity: React.FC<AddLiquidityProps> = (
  props: AddLiquidityProps
) => {
  const topicContext = React.useContext(TopicContext);

  const [ethSupplyAmt, setEthSupplyAmt] = useState(10);
  const [usdcSupplyAmt, setUsdcSupplyAmt] = useState(182);
  const [buttonLabel, setButtonLabel] = useState("Supply");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSupply = () => {
    setEthSupplyAmt(0);
    setButtonLabel("Success!");
    props.onSupply && props.onSupply(ethSupplyAmt, usdcSupplyAmt);
    setUsdcSupplyAmt(0);
    setEthSupplyAmt(0);
    setIsButtonDisabled(true);

    topicContext && topicContext.onContinue && topicContext.onContinue();
  };

  return (
    <Card className={cn("w-[80%]", props.className)}>
      <CardHeader className="p-3">
        <div className="flex flex-row w-full">
          <div className="w-2/3 font-semibold text-right">Add Liquidity</div>
          <X size={24} className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 mt-5">
          <div className="text-sm text-gray-500">Input</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg">{ethSupplyAmt} ETH</div>
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
          <div className="text-sm text-gray-500">Input</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg">{usdcSupplyAmt} USDC</div>
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
          onClick={onSupply}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddLiquidity;
