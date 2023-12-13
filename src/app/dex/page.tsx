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

import { ChapterIds } from "@/app/data/staticDataService";
import { getChapter } from "@/app/data/staticDataService";
import React from "react";
import { AppContext } from "../contexts/AppContextProvider";

export default function Dex() {
  const {
    setCurrentChapter,
    setCurrentProgress,
    currentTopic,
    setCurrentTopic,
  } = React.useContext(AppContext)!;

  // get chapter data from staticDataService
  const chapter = getChapter(ChapterIds.Dex);
  const topics = chapter!.topics;

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
        <CardContent>
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
        </CardContent>
      </Card>
      <Card className="ml-20 mt-20 max-w-xl border-none shadow-none">
        <CardContent>
          <Image
            id="start"
            src="/images/start.svg"
            alt="Image"
            width={70}
            height={44}
            className="ml-[5px]"
          />
          <TopicList topics={topics} activeTopic={currentTopic} />
        </CardContent>
      </Card>
    </div>
  );
}
