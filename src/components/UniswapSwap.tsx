"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import useEthBalance from "@/hooks/useEthBalance";
import useUsdcBalance from "@/hooks/useUsdcBalance";
import useEthToUsdcPriceUniV1 from "@/hooks/useEthToUsdcPriceUniV1";
import { Input } from "../type/types";

export default function UniswapSwap() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Input>({ defaultValues: { input: "0" } });

  const ethBalance = useEthBalance();
  const usdcBalance = useUsdcBalance();
  const usdcOutput = useEthToUsdcPriceUniV1("1");

  const onSubmit = () => {}; // your form submit function which will invoke after successful validation

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
                <p className="text-xs text-gray-500 mr-2">
                  ETH Balance: {ethBalance}
                </p>
                <p className="text-xs text-gray-500 mr-2">
                  USDC Balance: {usdcBalance}
                </p>
                <p className="text-sm text-customBlue">Max</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <input
                className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                type="number"
                {...register("input", {
                  min: 1,
                  max: 100,
                  required: true
                })}
                onWheel={(e: any) => e.target.blur()}
              />
              <div className="flex items-center">ETH</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 mb-2">
          <Image
            id="start"
            src="/images/down-arrow.svg"
            alt="Image"
            width={20}
            height={20}
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-col px-4 py-3 rounded-2xl bg-gray-100 ">
            <div className="flex items-center justify-between w-full mt-1">
              <label className="text-left text-customGrey font-normal flex items-center">
                Output
              </label>
            </div>
            <div className="flex items-center justify-between w-full">
              <p>10000000</p>
              <div className="flex items-center">USDC</div>
            </div>
            <hr className="mt-4 mb-4" />
            <div className="flex items-center justify-between w-full">
              <p>1 ETH = {usdcOutput} USDC</p>
            </div>
          </div>
          {errors.input && (
            <h5 className="block text-left text-customPink text-xs md:text-base leading-tight font-normal mb-4 mt-3">
              the input amount must be in between 0 and your USDC balance
            </h5>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button className="bg-[#FF4081] w-full text-white">Buy</Button>
        </div>
      </form>
    </div>
  );
}
