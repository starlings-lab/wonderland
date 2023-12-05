import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>
            <p className="scroll-m-20 text-3xl tracking-tight">
              The best way to learn
            </p>
            <p className="scroll-m-20 text-3xl tracking-tight text-teal-500">
              Crypto and DeFi
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Learn by doing with interactive playgrounds and tutorials.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="bg-emerald-600 text-white">Get Started</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
