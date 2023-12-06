import TopicList from "@/components/TopicList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Dex() {
  const topics = [
    {
      title: "Buying & Selling",
      path: "/dex/buying-selling",
    },
    {
      title: "Pricing",
      path: "/dex/pricing",
    },
    {
      title: "Buying Playground",
      path: "/dex/buying-playground",
    },
    {
      title: "Liquidity Provision",
      path: "/dex/liquidity-provision",
    },
    {
      title: "Liquidity Provision Playground",
      path: "/dex/liquidity-provision-playground",
    },
    {
      title: "Slippage",
      path: "/dex/slippage",
    },
    {
      title: "Impermanent Loss",
      path: "/dex/impermanent-loss",
    },
    {
      title: "Impermanent Loss Playground",
      path: "/dex/impermanent-loss-playground",
    },
  ];

  return (
    <main className="flex min-h-screen flex-row p-12">
      <Card className="max-w-xl h-fit">
        <CardHeader>
          <CardTitle>
            <Image
              src="/dex.svg"
              alt="Image"
              width={78}
              height={78}
              className="mb-5"
            />
            Decentralized Exchange
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="home-desc mb-5">
            Learn about the most fundamental financial primitive in DeFi.
          </CardDescription>

          <div className="flex items-center space-x-2 mt-8">
            <Image
              id="chapter"
              src="/chapters.svg"
              alt="Image"
              width={16}
              height={15}
            />
            <Label htmlFor="chapter">{topics.length} Chapters</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="ml-20 mt-20 max-w-xl border-none">
        <CardContent>
          <Image
            id="start"
            src="/start.svg"
            alt="Image"
            width={70}
            height={44}
            className="ml-[5px]"
          />
          <TopicList topics={topics} initialActiveTopic={topics[0].title} />
        </CardContent>
      </Card>
    </main>
  );
}
