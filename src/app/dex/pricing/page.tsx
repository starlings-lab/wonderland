import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-5">
            In the previous chapter, we learned that a decentralized exchange is
            a place where you can buy and sell cryptocurrencies with no one in
            the middle. But how do they determine how much you can get when you
            buy or sell?They achieve this automatically by looking at some
            values in the exchange. Each decentralized exchange has a different
            system for this, and we will take an example of Uniswap, which is
            the biggest decentralized exchange.
          </div>
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default Pricing;
