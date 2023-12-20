import { Interface } from "@ethersproject/abi";
import { hexZeroPad } from "@ethersproject/bytes";
import { JsonRpcProvider } from "@ethersproject/providers";
import {
  parseEther,
  parseUnits,
  formatEther,
  formatUnits
} from "@ethersproject/units";
import type { Address } from "abitype";
import { USDC_NUM_OF_DECIMALS } from "./usdc";

export const UNISWAP_V1_USDC_EXCHANGE_ADDRESS: Address =
  "0x97deC872013f6B5fB443861090ad931542878126";
export const UNISWAP_V1_USDC_EXCHANGE_ABI: object[] = [
  {
    name: "TokenPurchase",
    inputs: [
      { type: "address", name: "buyer", indexed: true },
      { type: "uint256", name: "eth_sold", indexed: true },
      { type: "uint256", name: "tokens_bought", indexed: true }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "EthPurchase",
    inputs: [
      { type: "address", name: "buyer", indexed: true },
      { type: "uint256", name: "tokens_sold", indexed: true },
      { type: "uint256", name: "eth_bought", indexed: true }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "AddLiquidity",
    inputs: [
      { type: "address", name: "provider", indexed: true },
      { type: "uint256", name: "eth_amount", indexed: true },
      { type: "uint256", name: "token_amount", indexed: true }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "RemoveLiquidity",
    inputs: [
      { type: "address", name: "provider", indexed: true },
      { type: "uint256", name: "eth_amount", indexed: true },
      { type: "uint256", name: "token_amount", indexed: true }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "Transfer",
    inputs: [
      { type: "address", name: "_from", indexed: true },
      { type: "address", name: "_to", indexed: true },
      { type: "uint256", name: "_value", indexed: false }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "Approval",
    inputs: [
      { type: "address", name: "_owner", indexed: true },
      { type: "address", name: "_spender", indexed: true },
      { type: "uint256", name: "_value", indexed: false }
    ],
    anonymous: false,
    type: "event"
  },
  {
    name: "setup",
    outputs: [],
    inputs: [{ type: "address", name: "token_addr" }],
    constant: false,
    payable: false,
    type: "function",
    gas: 175875
  },
  {
    name: "addLiquidity",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "min_liquidity" },
      { type: "uint256", name: "max_tokens" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: true,
    type: "function",
    gas: 82616
  },
  {
    name: "removeLiquidity",
    outputs: [
      { type: "uint256", name: "out" },
      { type: "uint256", name: "out" }
    ],
    inputs: [
      { type: "uint256", name: "amount" },
      { type: "uint256", name: "min_eth" },
      { type: "uint256", name: "min_tokens" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 116814
  },
  {
    name: "__default__",
    outputs: [],
    inputs: [],
    constant: false,
    payable: true,
    type: "function"
  },
  {
    name: "ethToTokenSwapInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "min_tokens" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: true,
    type: "function",
    gas: 12757
  },
  {
    name: "ethToTokenTransferInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "min_tokens" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" }
    ],
    constant: false,
    payable: true,
    type: "function",
    gas: 12965
  },
  {
    name: "ethToTokenSwapOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: true,
    type: "function",
    gas: 50463
  },
  {
    name: "ethToTokenTransferOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" }
    ],
    constant: false,
    payable: true,
    type: "function",
    gas: 50671
  },
  {
    name: "tokenToEthSwapInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_eth" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 47503
  },
  {
    name: "tokenToEthTransferInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_eth" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 47712
  },
  {
    name: "tokenToEthSwapOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "eth_bought" },
      { type: "uint256", name: "max_tokens" },
      { type: "uint256", name: "deadline" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 50175
  },
  {
    name: "tokenToEthTransferOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "eth_bought" },
      { type: "uint256", name: "max_tokens" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 50384
  },
  {
    name: "tokenToTokenSwapInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_tokens_bought" },
      { type: "uint256", name: "min_eth_bought" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "token_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 51007
  },
  {
    name: "tokenToTokenTransferInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_tokens_bought" },
      { type: "uint256", name: "min_eth_bought" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" },
      { type: "address", name: "token_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 51098
  },
  {
    name: "tokenToTokenSwapOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "max_tokens_sold" },
      { type: "uint256", name: "max_eth_sold" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "token_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 54928
  },
  {
    name: "tokenToTokenTransferOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "max_tokens_sold" },
      { type: "uint256", name: "max_eth_sold" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" },
      { type: "address", name: "token_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 55019
  },
  {
    name: "tokenToExchangeSwapInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_tokens_bought" },
      { type: "uint256", name: "min_eth_bought" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "exchange_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 49342
  },
  {
    name: "tokenToExchangeTransferInput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_sold" },
      { type: "uint256", name: "min_tokens_bought" },
      { type: "uint256", name: "min_eth_bought" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" },
      { type: "address", name: "exchange_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 49532
  },
  {
    name: "tokenToExchangeSwapOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "max_tokens_sold" },
      { type: "uint256", name: "max_eth_sold" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "exchange_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 53233
  },
  {
    name: "tokenToExchangeTransferOutput",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "uint256", name: "tokens_bought" },
      { type: "uint256", name: "max_tokens_sold" },
      { type: "uint256", name: "max_eth_sold" },
      { type: "uint256", name: "deadline" },
      { type: "address", name: "recipient" },
      { type: "address", name: "exchange_addr" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 53423
  },
  {
    name: "getEthToTokenInputPrice",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "uint256", name: "eth_sold" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 5542
  },
  {
    name: "getEthToTokenOutputPrice",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "uint256", name: "tokens_bought" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 6872
  },
  {
    name: "getTokenToEthInputPrice",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "uint256", name: "tokens_sold" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 5637
  },
  {
    name: "getTokenToEthOutputPrice",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "uint256", name: "eth_bought" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 6897
  },
  {
    name: "tokenAddress",
    outputs: [{ type: "address", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1413
  },
  {
    name: "factoryAddress",
    outputs: [{ type: "address", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1443
  },
  {
    name: "balanceOf",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [{ type: "address", name: "_owner" }],
    constant: true,
    payable: false,
    type: "function",
    gas: 1645
  },
  {
    name: "transfer",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 75034
  },
  {
    name: "transferFrom",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_from" },
      { type: "address", name: "_to" },
      { type: "uint256", name: "_value" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 110907
  },
  {
    name: "approve",
    outputs: [{ type: "bool", name: "out" }],
    inputs: [
      { type: "address", name: "_spender" },
      { type: "uint256", name: "_value" }
    ],
    constant: false,
    payable: false,
    type: "function",
    gas: 38769
  },
  {
    name: "allowance",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [
      { type: "address", name: "_owner" },
      { type: "address", name: "_spender" }
    ],
    constant: true,
    payable: false,
    type: "function",
    gas: 1925
  },
  {
    name: "name",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1623
  },
  {
    name: "symbol",
    outputs: [{ type: "bytes32", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1653
  },
  {
    name: "decimals",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1683
  },
  {
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1713
  }
];

export const UNISWAP_V1_USDC_EXCHANGE_INTERFACE = new Interface(
  UNISWAP_V1_USDC_EXCHANGE_ABI
);

const rpcUrl = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
const forkProvider = new JsonRpcProvider(rpcUrl);
if (forkProvider) {
  console.log("forkProvider created with rpcUrl:", rpcUrl);
}

export async function addLiquidity(ethInput: string, maxUsdcInput: string) {
  try {
    const accounts = await forkProvider.listAccounts();
    const ownerAddress = accounts[0];
    console.log("ownerAddress ==>", ownerAddress);

    const ownerSigner = forkProvider.getSigner(ownerAddress);
    const deadline = Math.floor(Date.now() / 1000) + 60; // 1 minute from now

    const addLiquidityTx = await ownerSigner.sendTransaction({
      to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
        "addLiquidity",
        [
          parseUnits("1", 18), // min_liquidity
          // for ETH-USDC pair, max_tokens = ETH-USDC-price * ethInput
          // For example, if current ETH-USDC price is 2000, and ethInput is 10 ETH,
          // max_tokens = 2,000 * 10 = 20,000 USDC
          // If price fluctuates higher than 2000, the transaction will fail
          parseUnits(maxUsdcInput, USDC_NUM_OF_DECIMALS),
          // deadline in seconds, current time + 1 minute
          parseUnits(deadline.toString(), 0)
        ]
      ),
      value: parseEther(ethInput),
      gasLimit: 800000
    });

    console.log("addLiquidityTx ==>", addLiquidityTx);

    // wait for the transaction to be mined
    const txReceipt = await addLiquidityTx.wait();
    console.log("txReceipt ==>", txReceipt);
    return txReceipt;
  } catch (error) {
    console.log("Failed to add liquidity for ethInput:", ethInput);
    console.error(error);
  }
}

export async function ethToUsdcSwap(ethInput: string) {
  let usdcBought = "0";

  if (!ethInput || ethInput === "0") {
    return usdcBought;
  }

  const ownerSigner = forkProvider.getSigner(
    process.env.NEXT_PUBLIC_OWNER_ADDRESS
  );
  const deadline = Math.floor(Date.now() / 1000) + 60;

  try {
    const ethToUsdcSwapTx = await ownerSigner.sendTransaction({
      to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      value: parseEther(ethInput),
      data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
        "ethToTokenSwapInput",
        [
          parseUnits("1", USDC_NUM_OF_DECIMALS),
          parseUnits(deadline.toString(), 0)
        ]
      )
    });
    const receipt = await ethToUsdcSwapTx.wait();
    const events = UNISWAP_V1_USDC_EXCHANGE_INTERFACE.parseLog(receipt.logs[0]);
    usdcBought = formatUnits(events.args[2].toString(), USDC_NUM_OF_DECIMALS);
  } catch (error) {
    console.log("Failed to get ethToUsdcSwap for usdcInput:", ethInput);
    console.error(error);
  }
  return usdcBought;
}

export async function usdcToEthSwap(usdcInput: string) {
  let ethBought = "0";

  if (!usdcInput || usdcInput === "0") {
    return ethBought;
  }

  const ownerSigner = forkProvider.getSigner(
    process.env.NEXT_PUBLIC_OWNER_ADDRESS
  );
  const deadline = Math.floor(Date.now() / 1000) + 60;

  try {
    const usdcToEthSwapTx = await ownerSigner.sendTransaction({
      to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
        "tokenToEthSwapInput",
        [
          parseUnits(usdcInput, USDC_NUM_OF_DECIMALS),
          parseEther("0.000000000000000001"),
          parseUnits(deadline.toString(), 0)
        ]
      )
    });
    const receipt = await usdcToEthSwapTx.wait();
    const events = UNISWAP_V1_USDC_EXCHANGE_INTERFACE.parseLog(receipt.logs[0]);
    ethBought = formatUnits(events.args[2].toString(), USDC_NUM_OF_DECIMALS);
  } catch (error) {
    console.log("Failed to get usdcToEthSwap for usdcInput:", usdcInput);
    console.error(error);
  }
  return ethBought;
}

export async function ethToUsdcPriceUniV1(ethInput: string) {
  let usdcOutput = "0";

  if (!ethInput || ethInput === "0") {
    return usdcOutput;
  }

  try {
    const result = await forkProvider.call({
      to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
        "getEthToTokenInputPrice",
        [parseEther(ethInput)]
      )
    });
    const output = UNISWAP_V1_USDC_EXCHANGE_INTERFACE.decodeFunctionResult(
      "getEthToTokenInputPrice",
      result
    );
    usdcOutput = formatUnits(output.toString(), USDC_NUM_OF_DECIMALS);
  } catch (error) {
    console.log("Failed to get ethToUsdcPriceUniV1 for ethInput:", ethInput);
    console.error(error);
  }
  return usdcOutput;
}

export async function usdcToEthPriceUniV1(usdcInput: string) {
  let ethOutput = "0";

  if (!usdcInput || usdcInput === "0") {
    return ethOutput;
  }

  try {
    const result = await forkProvider.call({
      to: UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      data: UNISWAP_V1_USDC_EXCHANGE_INTERFACE.encodeFunctionData(
        "getTokenToEthInputPrice",
        [parseUnits(usdcInput, USDC_NUM_OF_DECIMALS)]
      )
    });
    const output = UNISWAP_V1_USDC_EXCHANGE_INTERFACE.decodeFunctionResult(
      "getTokenToEthInputPrice",
      result
    );
    ethOutput = formatEther(output.toString());
  } catch (error) {
    console.log("Failed to get ethToUsdcPriceUniV1 for usdcInput:", usdcInput);
    console.error(error);
  }
  return ethOutput;
}
