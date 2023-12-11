"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";
import { ChapterIds, getChapter } from "@/app/data/staticDataService";

const ReviewPage: React.FC = () => {
  const { setCurrentTopic } = React.useContext(AppContext)!;
  const router = useRouter();
  // get chapter data from staticDataService
  const chapter = getChapter(ChapterIds.Dex);
  const topics = chapter!.topics;

  const finishLesson = () => {
    router.push("/dex");
    setCurrentTopic(topics[1].title);
  };

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
          <div className="flex flex-row justify-center items-center">
            <Button onClick={finishLesson}>Finish Lesson</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ReviewPage;
