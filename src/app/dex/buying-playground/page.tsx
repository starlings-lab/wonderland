"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UniswapPoolBalanceChart } from "@/components/UniswapPoolBalanceChart";
import UniswapSwap from "@/components/UniswapSwap";

export default function BuyingPlayground() {
  const [showPlayground, setShowPlayground] = useState(false);

  const startPlayground = () => {
    setShowPlayground(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="max-w-xl h-fit mt-5">
        <CardHeader>
          <CardTitle>Buying Playground</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            We prepared a dummy decentralized exchange that simulates the real
            Uniswap exchange.
          </div>
          {showPlayground ? (
            <>
              <div className="mb-8">
                Buy ETH or USDC in the widget on the right.
              </div>
              <div>
                You can see how your balance, pool balance, and the price
                changes as you buy.
              </div>
            </>
          ) : (
            <div>Click on “Start Playing!” button to start!</div>
          )}
          {showPlayground ? null : (
            <Button className="mt-5" onClick={startPlayground}>
              Start Playing!
            </Button>
          )}
        </CardContent>
        {showPlayground && (
          <div className="flex">
            <UniswapPoolBalanceChart />
            <UniswapSwap />
          </div>
        )}
      </Card>
    </main>
  );
}
