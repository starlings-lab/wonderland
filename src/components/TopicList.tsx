import React from "react";
import Image from "next/image";
import ChapterButton from "./ChapterButton";
import { cn } from "@/lib/utils";

interface TopicListProps {
  topics: string[];
  activeTopic: string;
}

const TopicList: React.FC<TopicListProps> = ({ topics, activeTopic }) => {
  return topics.map((topic, index) => (
    <>
      <ChapterButton
        active={topic === activeTopic}
        description={topic}
        className={cn(topic === activeTopic ? "mt-3" : "mt-1")}
      />
      {index === topics.length - 1 ? null : (
        <div className="flex justify-center w-[80px] p-1">
          <Image src="/vertical-line.svg" alt="Image" width={3} height={21} />
        </div>
      )}
    </>
  ));
};

export default TopicList;
