import { NextResponse } from "next/server";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseUnits, parseEther } from "@ethersproject/units";
import { hexZeroPad, hexValue } from "@ethersproject/bytes";
import { Interface } from "@ethersproject/abi";
import {
  USDC_ABI,
  USDC_NUM_OF_DECIMALS,
  USDC_ADDRESS
} from "../../../contracts/usdc";
import { UNISWAP_V1_USDC_EXCHANGE_ADDRESS } from "../../../contracts/uniswap-v1-usdc-exchange";

const usdcInterface = new Interface(USDC_ABI);

export async function POST() {
  try {
    console.log("fork creation starts");
    const response = await createFork();
    console.log("fork creation ends");

    const fork = await response.json();
    const forkId = fork.data.simulation_fork.id;
    console.log("forkId ==>", forkId);

    const rpcUrl = `https://rpc.tenderly.co/fork/${forkId}`;
    const forkProvider = new JsonRpcProvider(rpcUrl);
    console.log("forkProvider connection", forkProvider.connection);

    const accounts = await forkProvider.listAccounts();
    const ownerAddress = accounts[0];
    console.log("ownerAddress ==>", ownerAddress);

    const ownerSigner = forkProvider.getSigner(ownerAddress);

    const tenderlyEthTransfer = await forkProvider.send("tenderly_addBalance", [
      [ownerAddress],
      hexValue(parseEther("9900").toHexString())
    ]);
    console.log("tenderlyEthTransfer ==>", tenderlyEthTransfer);

    const setOwnerUSDCBalance = await forkProvider.send(
      "tenderly_setErc20Balance",
      [
        USDC_ADDRESS,
        ownerAddress,
        hexValue(parseEther("0.00001").toHexString())
      ]
    );
    console.log("setOwnerUSDCBalance ==>", setOwnerUSDCBalance);

    const usdcApproveTx = await ownerSigner.sendTransaction({
      to: USDC_ADDRESS,
      data: usdcInterface.encodeFunctionData("approve", [
        hexZeroPad(UNISWAP_V1_USDC_EXCHANGE_ADDRESS.toLowerCase(), 20),
        parseUnits("100000000", USDC_NUM_OF_DECIMALS)
      ]),
      gasLimit: 800000
    });
    console.log("usdcApproveTx ==>", usdcApproveTx);

    const setUniV1EthBalance = await forkProvider.send("tenderly_setBalance", [
      UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
      hexValue(parseEther("100").toHexString())
    ]);
    console.log("setUniV1EthBalance ==>", setUniV1EthBalance);

    const setUniV1USDCBalance = await forkProvider.send(
      "tenderly_setErc20Balance",
      [
        USDC_ADDRESS,
        UNISWAP_V1_USDC_EXCHANGE_ADDRESS,
        hexValue(parseEther("0.0001").toHexString())
        // The amount will be converted with 12 decimal points in mind.
        // Due to the way they convert, the decimal points are ETH decimal points minus ERC20 token decimal points.
        // ETH has 18 decimal points, USDC has 6 decimal points.
        // Thus, USDC balance above will be 0.0001 * (10 ** (18 - 6)) = 100000000
        // https://docs.tenderly.co/devnets/advanced/custom-rpc-methods#tenderly_seterc20balance
      ]
    );
    console.log("setUniV1USDCBalance ==>", setUniV1USDCBalance);

    console.log("Transactions sent successfully!");
    return NextResponse.json({
      data: {
        tenderlyEthTransfer,
        setOwnerUSDCBalance,
        usdcApproveTx,
        setUniV1EthBalance,
        setUniV1USDCBalance
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function createFork() {
  const url = `https://api.tenderly.co/api/v1/account/${process.env.NEXT_PUBLIC_TENDERLY_USER}/project/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key": process.env.TENDERLY_ACCESS_KEY
    },
    body: JSON.stringify({
      network_id: "1", // network you wish to fork
      chain_config: {
        chain_id: 11, // chain_id used in the forked environment
        shanghai_time: 1677557088
      }
    })
  });

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json({ data });
  } else {
    throw new Error("Error creating mainnet fork");
  }
}
