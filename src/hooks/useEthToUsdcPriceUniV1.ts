import { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseEther, formatUnits } from "@ethersproject/units";
import { USDC_NUM_OF_DECIMALS } from "@/contracts/usdc";
import {
  UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
  UNISWAP_V1_USDC_EXCHANGE_INTERFACE,
} from "@/contracts/uniswap-v1-usdc-exchange";

export default function useEthToUsdcPriceUniV1(ethInput: string) {
  const [usdcOutput, setUsdcOutput] = useState<string>("");
  const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
  const forkProvider = new JsonRpcProvider(rpcUrl);

  useEffect(() => {
    async function fetchUsdcOutput() {
      try {
        const result = await forkProvider.call({
          to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
          data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
            "getEthToTokenInputPrice",
            [parseEther(ethInput)]
          ),
        });
        const output = UNISWAP_V1_USDC_EXCHANGE_INTERFACE.decodeFunctionResult(
          "getEthToTokenInputPrice",
          result
        );
        setUsdcOutput(formatUnits(output.toString(), USDC_NUM_OF_DECIMALS));
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsdcOutput();
  });

  return usdcOutput;
}
