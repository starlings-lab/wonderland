import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IndexPage() {
  return (
    <main className="flex min-h-screen flex-col p-12 items-center">
      <Card className="max-w-2xl border-none shadow-none">
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
            Learn by doing with interactive tutorials and playgrounds.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="bg-[#179E7E] text-white">
            <Link href={`/dex`}>Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
