"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ChapterButton from "./ChapterButton";
import { cn } from "@/lib/utils";

export interface Topic {
  title: string;
  path: string;
}

interface TopicListProps {
  topics: Topic[];
  initialActiveTopic: string;
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  initialActiveTopic,
}) => {
  const [activeTopic, setActiveTopic] = React.useState(initialActiveTopic);

  return topics.map((topic, index) => (
    <>
      <Link href={topic.path} passHref>
        <ChapterButton
          active={topic.title === activeTopic}
          description={topic.title}
          className={cn(topic.title === activeTopic ? "mt-3" : "mt-1")}
        />
      </Link>

      {index === topics.length - 1 ? null : (
        <div className="flex justify-center w-[80px] p-1">
          <Image src="/vertical-line.svg" alt="Image" width={3} height={21} />
        </div>
      )}
    </>
  ));
};

export default TopicList;
