import type { Address } from "abitype";
import { useState, useEffect } from "react";
import { Interface } from "@ethersproject/abi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import {
  USDC_ABI,
  USDC_NUM_OF_DECIMALS,
  USDC_ADDRESS,
} from "../contracts/usdc";

const usdcInterface = new Interface(USDC_ABI);

export default function useUsdcBalance(address: Address) {
  const [usdcBalance, setUsdcBalance] = useState<string>("");
  const [formattedUsdcBalance, setFormattedUsdcBalance] = useState<string>("");
  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);

  useEffect(() => {
    async function fetchUsdcBalance() {
      try {
        const balance = await forkProvider.call({
          to: USDC_ADDRESS,
          data: usdcInterface.encodeFunctionData("balanceOf", [address]),
        });

        const newUsdcBalance = formatUnits(balance, USDC_NUM_OF_DECIMALS);
        setUsdcBalance(newUsdcBalance);

        const formattedBalance = parseFloat(newUsdcBalance).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );

        setFormattedUsdcBalance(formattedBalance);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsdcBalance();
  }); // Empty dependency array means this effect runs once on component mount

  return [usdcBalance, formattedUsdcBalance];
}
