import { useState, useEffect } from "react";
import { Interface } from "@ethersproject/abi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther, formatUnits } from "@ethersproject/units";
import { USDC_NUM_OF_DECIMALS } from "../contracts/usdc";
import {
  UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
  UNISWAP_V1_USDC_EXCHANGE_ABI
} from "../contracts/uniswap-v1-usdc-exchange";

const uniswapV1UsdcExchangeInterface = new Interface(
  UNISWAP_V1_USDC_EXCHANGE_ABI
);

export default function useEthToUsdcUniV1(ethInput: string) {
  const [usdcOutput, setUsdcOutput] = useState<string>("");
  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);

  useEffect(() => {
    async function fetchUsdcOutput() {
      try {
        const result = await forkProvider.call({
          to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
          data: uniswapV1UsdcExchangeInterface.encodeFunctionData(
            "getEthToTokenInputPrice",
            [parseEther(ethInput)]
          )
        });
        const output = uniswapV1UsdcExchangeInterface.decodeFunctionResult(
          "getEthToTokenInputPrice",
          result
        );
        setUsdcOutput(formatUnits(output.toString(), USDC_NUM_OF_DECIMALS));
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsdcOutput();
  }, []);

  return usdcOutput;
}
