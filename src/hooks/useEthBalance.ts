import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

export default function useEthBalance() {
  const [ethBalance, setEthBalance] = useState<string>("");
  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);

  useEffect(() => {
    async function fetchETHBalance() {
      try {
        const balance = await forkProvider.getBalance(
          process.env.NEXT_PUBLIC_OWNER_ADDRESS
        );
        setEthBalance(formatEther(balance));
      } catch (error) {
        console.error(error);
      }
    }

    fetchETHBalance();
  }); // Empty dependency array means this effect runs once on component mount

  return ethBalance;
}
