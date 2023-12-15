"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";

export type ReviewCardProps = {
  children: React.ReactNode;
  nextTopicIndex: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  children,
  nextTopicIndex,
}) => {
  const {
    currentChapter,
    currentTopic,
    setCurrentTopic,
    completedTopics,
    setCompletedTopics,
  } = React.useContext(AppContext)!;
  const router = useRouter();

  const topics = currentChapter!.topics;

  const finishLesson = () => {
    router.push(currentChapter!.path);
    setCompletedTopics(completedTopics.concat(currentTopic!));

    console.log("Setting current topic: ", topics[nextTopicIndex]);
    setCurrentTopic(topics[nextTopicIndex]);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Review & Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
          <div className="flex flex-row justify-center items-center mt-5">
            <Button onClick={finishLesson}>Finish Lesson</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewCard;
