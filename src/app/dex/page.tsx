"use client";

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

import { getChapter } from "@/app/data/staticDataService";
import React from "react";
import { AppContext } from "../contexts/AppContextProvider";
import { ChapterIds } from "@/type/types";

export default function Dex() {
  const {
    setCurrentChapter,
    setCurrentProgress,
    currentTopic,
    setCurrentTopic,
    completedTopics,
  } = React.useContext(AppContext)!;

  // get chapter data from staticDataService
  const chapter = getChapter(ChapterIds.Dex);
  const topics = chapter!.topics;

  console.log("Completed topics: ", completedTopics);

  React.useEffect(() => {
    setCurrentChapter(chapter);
    setCurrentProgress(0);

    // set current topic to first topic only when currentTopic is null
    if (!currentTopic) {
      console.log("set current topic to first topic: ", topics[0].title);
      setCurrentTopic(topics[0]);
    }
  });

  return (
    <div className="flex flex-row p-12">
      <Card className="max-w-xl h-fit">
        <CardHeader>
          <CardTitle>
            <Image
              src="/images/dex.svg"
              alt="Image"
              width={78}
              height={78}
              className="mb-5"
            />
            Decentralized Exchange
          </CardTitle>
        </CardHeader>
        <div className="p-8">
          <CardDescription className="home-desc mb-5">
            Learn about the most fundamental financial primitive in DeFi.
          </CardDescription>

          <div className="flex items-center space-x-2 mt-8">
            <Image
              id="chapter"
              src="/images/chapters.svg"
              alt="Image"
              width={16}
              height={15}
            />
            <Label htmlFor="chapter">{topics.length} Chapters</Label>
          </div>
        </div>
      </Card>
      <Card className="ml-20 mt-20 max-w-xl border-none shadow-none">
        <CardContent>
          <TopicList
            topics={topics}
            activeTopic={currentTopic!}
            completedTopics={completedTopics}
          />
        </CardContent>
      </Card>
    </div>
  );
}
