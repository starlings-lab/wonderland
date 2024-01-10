import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IndexPage() {
  return (
    <main className="flex flex-col items-center pt-16">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>
            <p className="scroll-m-20 text-3xl tracking-tight home">
              The best way to learn
            </p>
            <p className="scroll-m-20 text-3xl tracking-tight text-teal-500 home">
              Crypto and DeFi
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="home-desc">
            Learn proactively with interactive contents and playgrounds.
          </CardDescription>
          <Button className="bg-[#179E7E] text-white mt-4">
            <Link href={`/dex`}>Get Started</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
