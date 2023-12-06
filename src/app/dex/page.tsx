import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ChapterButton from "../../components/ChapterButton";

export default function Dex() {
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
            <Label htmlFor="chapter">5 Chapters</Label>
          </div>
        </CardContent>
      </Card>
      <Card className="ml-5 mt-20 max-w-xl border-none">
        <CardContent>
          <Image
            id="start"
            src="/start.svg"
            alt="Image"
            width={70}
            height={44}
            className="ml-[5px]"
          />
          <ChapterButton
            active={true}
            description="Buying & Selling"
            className="mt-3"
          />
          <div className="flex justify-center w-[80px] p-1">
            <Image src="/vertical-line.svg" alt="Image" width={3} height={21} />
          </div>
          <ChapterButton
            active={false}
            description="Pricing"
            className="mt-1"
          />
        </CardContent>
      </Card>
    </main>
  );
}
