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
  return (
    <main className="flex min-h-screen flex-col p-12">
      <Card className="max-w-xl">
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
            <Label htmlFor="chapter">5 Chapters</Label>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
