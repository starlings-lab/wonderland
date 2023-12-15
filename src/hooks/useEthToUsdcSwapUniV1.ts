import { useState, useEffect } from "react";
import { Interface } from "@ethersproject/abi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther, parseUnits, formatUnits } from "@ethersproject/units";
import { USDC_NUM_OF_DECIMALS } from "../contracts/usdc";
import {
  UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
  UNISWAP_V1_USDC_EXCHANGE_ABI
} from "../contracts/uniswap-v1-usdc-exchange";

const uniswapV1UsdcExchangeInterface = new Interface(
  UNISWAP_V1_USDC_EXCHANGE_ABI
);

export default function useEthToUsdcSwapUniV1(ethInput: string) {
  const [usdcBought, setUsdcBought] = useState<string>("");
  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);
  const ownerSigner = forkProvider.getSigner(
    process.env.NEXT_PUBLIC_OWNER_ADDRESS
  );

  useEffect(() => {
    async function ethToUsdcSwap() {
      const deadline = Math.floor(Date.now() / 1000) + 60;
      try {
        const ethToUsdcSwapTx = await ownerSigner.sendTransaction({
          to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
          value: parseEther(ethInput),
          data: uniswapV1UsdcExchangeInterface.encodeFunctionData(
            "ethToTokenSwapInput",
            [
              parseUnits("1", USDC_NUM_OF_DECIMALS),
              parseUnits(deadline.toString(), 0)
            ]
          )
        });
        const receipt = await ethToUsdcSwapTx.wait();
        const events = uniswapV1UsdcExchangeInterface.parseLog(receipt.logs[0]);
        const usdcBought = events.args[2].toString();

        setUsdcBought(formatUnits(usdcBought, USDC_NUM_OF_DECIMALS));
      } catch (error) {
        console.error(error);
      }
    }

    ethToUsdcSwap();
  }, []);

  return usdcBought;
}
