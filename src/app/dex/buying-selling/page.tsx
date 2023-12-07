"use client";
import React from "react";
import Image from "next/image";

import { AppContext } from "../../contexts/AppContextProvider";
import { ChapterIds, getChapter } from "@/app/data/staticDataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BuyingSelling: React.FC<void> = () => {
  const { setCurrentChapter, setCurrentProgress } =
    React.useContext(AppContext)!;

  // get chapter data from staticDataService
  // TODO: we should infer chapter from the URL
  const chapter = getChapter(ChapterIds.Dex);
  const topics = chapter!.topics;

  setCurrentChapter("BuyingSelling");
  setCurrentProgress(1 * (100 / topics.length));

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="max-w-xl h-fit mt-5">
        <CardHeader>
          <CardTitle>Buying & Selling</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            Exchanges are the place where you can buy or sell one currency with
            another currency. Usually, there is a company in the middle who
            facilitates this trade. If you want to buy currency A for currency
            B, you send currency B to the company. The company finds the seller
            for the currency A, and then send the currency A to you.
          </div>
          <Image
            src="/buying-selling.png"
            alt="Image"
            width={260}
            height={194}
          />
          <div className="invisible">
            Decentralized exchanges allow you to buy or sell cryptocurrencies
            with no one in the middle. If you want to buy cryptocurrency A for
            cryptocurrency B, you send cryptocurrency B and get cryptocurrency A
            back. There is no company in the middle.
          </div>
          <Button>Continue</Button>
        </CardContent>
      </Card>
      <Card className="max-w-xl h-fit mt-5">
        <CardContent></CardContent>
      </Card>
    </main>
  );
};

export default BuyingSelling;
