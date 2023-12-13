import { NextResponse } from "next/server";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseUnits, parseEther } from "@ethersproject/units";
import { hexZeroPad } from "@ethersproject/bytes";
import { Interface } from "@ethersproject/abi";
import {
  USDC_ABI,
  USDC_NUM_OF_DECIMALS,
  USDC_ADDRESS
} from "../../contracts/usdc";
import { UNISWAP_V1_USDC_EXCHANGE_ADDRESS } from "../../contracts/uniswap-v1-usdc-exchange";
import { CIRCLE_ACCOUNT_ADDRESS } from "../../constant/index";

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

    const [ownerSigner, circleSigner] = [
      forkProvider.getSigner(ownerAddress),
      forkProvider.getSigner(CIRCLE_ACCOUNT_ADDRESS)
    ];

    const ethTransferTx = await circleSigner.sendTransaction({
      to: ownerAddress,
      value: parseEther("1000")
    });
    console.log("ethTransferTx ==>", ethTransferTx);

    const usdcTransferTx = await circleSigner.sendTransaction({
      to: USDC_ADDRESS,
      data: usdcInterface.encodeFunctionData("transfer", [
        hexZeroPad(ownerAddress.toLowerCase(), 20),
        parseUnits("100000000", USDC_NUM_OF_DECIMALS)
      ]),
      gasLimit: 800000
    });
    console.log("usdcTransferTx ==>", usdcTransferTx);

    const usdcApproveTx = await ownerSigner.sendTransaction({
      to: USDC_ADDRESS,
      data: usdcInterface.encodeFunctionData("approve", [
        hexZeroPad(UNISWAP_V1_USDC_EXCHANGE_ADDRESS.toLowerCase(), 20),
        parseUnits("100000000", USDC_NUM_OF_DECIMALS)
      ]),
      gasLimit: 800000
    });
    console.log("usdcApproveTx ==>", usdcApproveTx);

    console.log("Transactions sent successfully!");
    return NextResponse.json({
      data: { ethTransferTx, usdcTransferTx, usdcApproveTx }
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
