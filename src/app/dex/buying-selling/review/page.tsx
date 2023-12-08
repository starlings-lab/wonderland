import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReviewPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Review & Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-5">
            We learned what a decentralized exchange is and how you can buy a
            cryptocurrency there.
          </div>
          <Link
            href="/dex"
            passHref
            className="flex flex-row justify-center items-center"
          >
            <Button>Finish Lesson</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReviewPage;
