import type { Address } from "abitype";
import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

export default function useEthBalance(address: Address) {
  const [ethBalance, setEthBalance] = useState<string>("");
  const [formattedEthBalance, setFormattedEthBalance] = useState<string>("");

  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);

  useEffect(() => {
    async function fetchETHBalance() {
      try {
        const balance = await forkProvider.getBalance(address);

        const newEthBalance = formatEther(balance);
        const formattedEthBalance = parseFloat(newEthBalance).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );
        setEthBalance(newEthBalance);
        setFormattedEthBalance(formattedEthBalance);
      } catch (error) {
        console.error(error);
      }
    }

    fetchETHBalance();
  }); // Empty dependency array means this effect runs once on component mount

  return [ethBalance, formattedEthBalance];
}
