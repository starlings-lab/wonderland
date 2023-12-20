"use client";
import type { Address } from "abitype";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Root,
  Trigger,
  Icon,
  Item,
  ItemText,
  Portal,
  Content,
  Viewport,
  Group,
  Value
} from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import useEthBalance from "@/hooks/useEthBalance";
import useUsdcBalance from "@/hooks/useUsdcBalance";
import {
  ethToUsdcPriceUniV1,
  usdcToEthPriceUniV1,
  ethToUsdcSwap,
  usdcToEthSwap
} from "../contracts/uniswap-v1-usdc-exchange";
import { Input } from "../type/types";
import { parseAndFormatFloat } from "@/lib/utils";

export interface UniswapSwapProps {
  className?: string;
  onBuy?: () => void;
}

export default function UniswapSwap({ className, onBuy }: UniswapSwapProps) {
  const [buying, setBuying] = useState(false);
  const [inputCurrency, setInputCurrency] = useState("ETH");
  const [usdcPrice, setUsdcPrice] = useState("0");
  const [ethPrice, setEthPrice] = useState("0");
  const [usdcOutput, setUsdcOutput] = useState("0");
  const [ethOutput, setEthOutput] = useState("0");

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<Input>({ defaultValues: { input: "0" } });
  const input = watch("input");

  const [ethBalance, formattedEthBalance] = useEthBalance(
    process.env.NEXT_PUBLIC_OWNER_ADDRESS as Address
  );
  const [usdcBalance, formattedUsdcBalance] = useUsdcBalance(
    process.env.NEXT_PUBLIC_OWNER_ADDRESS as Address
  );

  useEffect(() => {
    (async () => {
      if (inputCurrency === "ETH") {
        const usdcPrice = await ethToUsdcPriceUniV1("1");
        setUsdcPrice(parseAndFormatFloat(false, usdcPrice));
        const usdcOutput = await ethToUsdcPriceUniV1(input);
        setUsdcOutput(parseAndFormatFloat(false, usdcOutput));
      } else if (inputCurrency === "USDC") {
        const ethPrice = await usdcToEthPriceUniV1("1");
        setEthPrice(parseAndFormatFloat(true, ethPrice));
        const ethOutput = await usdcToEthPriceUniV1(input);
        setEthOutput(parseAndFormatFloat(true, ethOutput));
      }
    })();
  }, [input]);

  const onSubmit = async () => {
    setBuying(true);
    if (inputCurrency === "ETH") {
      await ethToUsdcSwap(getValues("input"));
    } else if (inputCurrency === "USDC") {
      await usdcToEthSwap(getValues("input"));
    }
    setBuying(false);
    onBuy && onBuy();
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
                {inputCurrency === "ETH" ? (
                  <p className="text-xs text-gray-500 mr-2">
                    Balance: {formattedEthBalance}
                  </p>
                ) : inputCurrency === "USDC" ? (
                  <p className="text-xs text-gray-500 mr-2">
                    Balance: {formattedUsdcBalance}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              {inputCurrency === "ETH" ? (
                <input
                  className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                  type="number"
                  step={0.01}
                  {...register("input", {
                    min: 1,
                    max: ethBalance,
                    required: true
                  })}
                  onWheel={(e: any) => e.target.blur()}
                />
              ) : inputCurrency === "USDC" ? (
                <input
                  className="block outline-none text-xl w-full text-black rounded bg-gray-100 out"
                  type="number"
                  step={0.01}
                  {...register("input", {
                    min: 1,
                    max: usdcBalance,
                    required: true
                  })}
                  onWheel={(e: any) => e.target.blur()}
                />
              ) : null}
              <Root value={inputCurrency} onValueChange={setInputCurrency}>
                <Trigger>
                  <div className="flex items-center">
                    <Value aria-label={inputCurrency}>{inputCurrency}</Value>
                    <Icon>
                      <ChevronDownIcon />
                    </Icon>
                  </div>
                </Trigger>
                <Portal>
                  <Content>
                    <Viewport>
                      <Group>
                        <Item value="ETH">
                          <ItemText>ETH</ItemText>
                        </Item>
                        <Item value="USDC">
                          <ItemText>USDC</ItemText>
                        </Item>
                      </Group>
                    </Viewport>
                  </Content>
                </Portal>
              </Root>
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
              {inputCurrency === "ETH" ? (
                <>
                  <p>{usdcOutput}</p>
                  <div className="flex items-center">USDC</div>
                </>
              ) : inputCurrency === "USDC" ? (
                <>
                  <p>{ethOutput}</p>
                  <div className="flex items-center">ETH</div>
                </>
              ) : null}
            </div>
            <hr className="mt-4 mb-4" />
            <div className="flex items-center justify-between w-full">
              {inputCurrency === "ETH" ? (
                <p>1 ETH = {usdcPrice} USDC</p>
              ) : inputCurrency === "USDC" ? (
                <p>1 USDC = {ethPrice} ETH</p>
              ) : null}
            </div>
          </div>
          {errors.input && (
            <h5 className="block text-left text-customPink text-xs md:text-base leading-tight font-normal mb-4 mt-3">
              the input amount must be in between 0 and your balance
            </h5>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button
            className="bg-[#FF4081] w-full text-white"
            disabled={!!(errors.input || buying)}
          >
            {buying ? "Buying..." : "Buy"}
          </Button>
        </div>
      </form>
    </div>
  );
}
