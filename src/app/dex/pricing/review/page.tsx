"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";

const ReviewPage: React.FC = () => {
  const { setCurrentTopic, currentChapter } = React.useContext(AppContext)!;
  const router = useRouter();
  const topics = currentChapter!.topics;

  const finishLesson = () => {
    console.log("currentChapter: ", currentChapter);
    router.push(currentChapter!.path);
    console.log("Setting current topic: ", topics[2].title);
    setCurrentTopic(topics[2]);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Review & Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-5">
            We learned how a decentralized exchange allows people to exchange
            one cryptocurrency with another one without a middleman using their
            pricing mechanism.
          </div>
          <div className="flex flex-row justify-center items-center">
            <Button onClick={finishLesson}>Finish Lesson</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPage;
