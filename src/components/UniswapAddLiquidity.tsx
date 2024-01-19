"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import useEthBalance from "@/hooks/useEthBalance";
import useUsdcBalance from "@/hooks/useUsdcBalance";
import {
  MIN_ETH_LIQUIDITY_AMOUNT,
  MIN_USDC_LIQUIDITY_AMOUNT,
  ethToUsdcPriceUniV1,
} from "../contracts/uniswap-v1-usdc-exchange";
import { LiquidityInput } from "../type/types";
import { PlusSquare } from "lucide-react";
import { addLiquidity } from "@/contracts/uniswap-v1-usdc-exchange";
import type { Address } from "abitype";
import { isValidNumberInput } from "@/lib/utils";

export interface UniswapAddLiquidityProps {
  className?: string;
  onSupply?: () => void;
}

export default function UniswapAddLiquidity({
  className,
  onSupply,
}: UniswapAddLiquidityProps) {
  const { toast } = useToast();

  const [ethUsdcPrice, setEthUsdcPrice] = useState("0");
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LiquidityInput>({
    defaultValues: { ethInput: "0", usdcInput: "0" },
  });

  const [supplying, setSupplying] = React.useState(false);

  const owner = process.env.NEXT_PUBLIC_OWNER_ADDRESS as Address;
  const [ethBalance, formattedEthBalance] = useEthBalance(owner);
  const [usdcBalance, formattedUsdcBalance] = useUsdcBalance(owner);

  React.useEffect(() => {
    (async () => {
      const usdcPrice = await ethToUsdcPriceUniV1("1");
      setEthUsdcPrice(usdcPrice);
    })();

    let valueBeingSet: "ethInput" | "usdcInput" | undefined;
    const subscription = watch((value, { name, type }) => {
      // prevent infinite loop
      if (
        (valueBeingSet === "ethInput" && name === "usdcInput") ||
        (valueBeingSet === "usdcInput" && name === "ethInput")
      ) {
        valueBeingSet = undefined;
        return;
      }

      console.log(value, name, type);
      valueBeingSet = name;

      if (name === "ethInput") {
        const usdcInput =
          (value.ethInput ? parseFloat(value.ethInput) : 0) *
          (ethUsdcPrice ? parseFloat(ethUsdcPrice) : 0);
        console.log("setting usdcInput: ", usdcInput);
        setValue("usdcInput", usdcInput.toFixed(2).toString());
      } else if (name === "usdcInput") {
        const ethInput =
          (value.usdcInput ? parseInt(value.usdcInput) : 0) /
          (ethUsdcPrice ? parseInt(ethUsdcPrice) : 0);
        console.log("setting ethInput: ", ethInput);
        setValue("ethInput", ethInput.toFixed(2).toString());
      }
      trigger();
    });

    return () => subscription.unsubscribe();
  }, [watch, ethUsdcPrice, trigger, setValue]);

  const onSubmit = () => {
    setSupplying(true);

    const ethInput = getValues("ethInput");
    const usdcInput = getValues("usdcInput");
    console.log(`Supplying liquidity: ${ethInput} ETH, ${usdcInput} USDC`);

    const maxUsdcInput = usdcBalance;
    addLiquidity(ethInput, maxUsdcInput)
      .then((txReceipt) => {
        toast({
          title: "Liquidity",
          description: "Successfully supplied liquidity!",
        });
      })
      .catch((error) => {
        toast({
          title: "Liquidity",
          description: "Supplying liquidity failed! Please try again.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setSupplying(false);
        onSupply?.();
      });
  }; // your form submit function which will invoke after successful validation

  // Input event handlers
  const onWheel = (e: any) => e.target.blur();
  const onInputFocus = (e: any) => {
    if (isValidNumberInput(e.target.value)) {
      return;
    }
    e.target.value = "";
  };

  return (
    <div className="mt-8 py-2 md:py-4 px-4 md:px-4 bg-white rounded-2xl shadow-card border border-gray-500 border-solid">
      <div className="flex justify-center">
        <Image
          id="start"
          src="/images/uniswap.svg"
          alt="Image"
          width={40}
          height={40}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-0 mt-4">
          <div className="flex flex-col px-4 py-3 rounded-2xl bg-gray-100 ">
            <div className="flex items-center justify-between w-full mt-1">
              <label className="text-left text-customGrey font-normal flex items-center">
                Input
              </label>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">
                  ETH Balance: {formattedEthBalance}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <input
                className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                type="number"
                step={MIN_ETH_LIQUIDITY_AMOUNT}
                {...register("ethInput", {
                  min: MIN_ETH_LIQUIDITY_AMOUNT,
                  max: ethBalance,
                  required: true,
                })}
                onWheel={onWheel}
                onFocus={onInputFocus}
              />
              <div className="flex flex-row justify-between items-center">
                <Image
                  id="eth"
                  src="/images/ethereum.png"
                  alt="ETH"
                  width={24}
                  height={24}
                />
                <div className="text-lg ml-1">ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-1 mb-1">
          <PlusSquare size={24} color="gray" />
        </div>
        <div className="mb-4">
          <div className="flex flex-col px-4 py-3 rounded-2xl bg-gray-100 ">
            <div className="flex items-center justify-between w-full mt-1">
              <label className="text-left text-customGrey font-normal flex items-center">
                Input
              </label>
              <div className="flex items-center">
                <p className="text-xs text-gray-500">
                  USDC Balance: {formattedUsdcBalance}
                </p>
                {/* <p className="text-sm text-customBlue ml-2">Max</p> */}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <input
                className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                type="number"
                step={MIN_USDC_LIQUIDITY_AMOUNT}
                {...register("usdcInput", {
                  min: MIN_USDC_LIQUIDITY_AMOUNT,
                  max: usdcBalance,
                  required: true,
                })}
                onWheel={onWheel}
                onFocus={onInputFocus}
              />
              <div className="flex flex-row justify-between items-center">
                <Image
                  id="usdc"
                  src="/images/usdc.png"
                  alt="USDC"
                  width={24}
                  height={24}
                />
                <div className="text-lg ml-1">USDC</div>
              </div>
            </div>
            <hr className="mt-4 mb-4" />
            <div className="flex items-center justify-between w-full">
              <p>1 ETH = {ethUsdcPrice} USDC</p>
            </div>
          </div>
          {errors.ethInput && getErrorElement("ETH", MIN_ETH_LIQUIDITY_AMOUNT)}
          {errors.usdcInput &&
            getErrorElement("USDC", MIN_USDC_LIQUIDITY_AMOUNT)}
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="bg-[#FF4081] w-full text-white"
            disabled={!!(errors.ethInput || errors.usdcInput || supplying)}
          >
            {supplying ? "Supplying..." : "Supply"}
          </Button>
        </div>
      </form>
    </div>
  );

  function getErrorElement(currency: string, minAmt: number): React.ReactNode {
    return (
      <h5 className="block text-left text-pink-700 text-xs md:text-base leading-tight font-normal mb-4 mt-3">
        {`The ${currency} input amount must be in between ${minAmt} and your ${currency} balance`}
      </h5>
    );
  }
}
