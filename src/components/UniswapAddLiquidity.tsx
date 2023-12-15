"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useEthBalance from "@/hooks/useEthBalance";
import useUsdcBalance from "@/hooks/useUsdcBalance";
import useEthToUsdcPriceUniV1 from "@/hooks/useEthToUsdcPriceUniV1";
import { LiquidityInput } from "../type/types";
import { PlusSquare } from "lucide-react";
import { addLiquidity } from "@/contracts/uniswap-v1-usdc-exchange";
import React from "react";

export default function UniswapAddLiquidity() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LiquidityInput>({
    defaultValues: { ethInput: "0", usdcInput: "0" },
  });

  const [supplying, setSupplying] = React.useState(false);

  const ethBalance = useEthBalance();
  const usdcBalance = useUsdcBalance();
  const ethUsdcPrice = useEthToUsdcPriceUniV1("1");

  React.useEffect(() => {
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
        setValue("usdcInput", usdcInput.toString());
      } else if (name === "usdcInput") {
        const ethInput =
          (value.usdcInput ? parseFloat(value.usdcInput) : 0) /
          (ethUsdcPrice ? parseFloat(ethUsdcPrice) : 0);
        console.log("setting ethInput: ", ethInput);
        setValue("ethInput", ethInput.toString());
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, ethUsdcPrice]);

  const onSubmit = () => {
    setSupplying(true);

    const ethInput = getValues("ethInput");
    const usdcInput = getValues("usdcInput");
    console.log(`Supplying liquidity: ${ethInput} ETH, ${usdcInput} USDC`);

    const maxUsdcInput = usdcBalance;
    addLiquidity(ethInput, usdcInput, maxUsdcInput)
      .then((txReceipt) => {
        console.log("Successfully supplied liquidity!");
        setSupplying(false);
      })
      .catch((error) => {
        console.log("Failed to supply liquidity!");
        console.log(error);
        setSupplying(false);
      });
  }; // your form submit function which will invoke after successful validation

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
                  ETH Balance: {ethBalance}
                </p>
                {/* <p className="text-sm text-customBlue mr-2">Max</p> */}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <input
                className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                type="number"
                {...register("ethInput", {
                  min: 1,
                  max: ethBalance,
                  required: true,
                })}
                onWheel={(e: any) => e.target.blur()}
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
                  USDC Balance: {usdcBalance}
                </p>
                {/* <p className="text-sm text-customBlue ml-2">Max</p> */}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <input
                className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                type="number"
                {...register("usdcInput", {
                  min: 1,
                  max: usdcBalance,
                  required: true,
                })}
                onWheel={(e: any) => e.target.blur()}
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
          {errors.ethInput && (
            <h5 className="block text-left text-pink-700 text-xs md:text-base leading-tight font-normal mb-4 mt-3">
              the ETH input amount must be in between 0 and your ETH balance
            </h5>
          )}
          {errors.usdcInput && (
            <h5 className="block text-left text-pink-700 text-xs md:text-base leading-tight font-normal mb-4 mt-3">
              the USDC input amount must be in between 0 and your USDC balance
            </h5>
          )}
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
}
