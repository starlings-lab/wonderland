import React from "react";
import Image from "next/image";
import Link from "next/link";
import ChapterButton from "./ChapterButton";
import { cn } from "@/lib/utils";
import { Topic } from "@/app/data/staticDataService";

interface TopicListProps {
  topics: Topic[];
  activeTopic: string;
}

const TopicList: React.FC<TopicListProps> = ({ topics, activeTopic }) => {
  console.log("topic: ", activeTopic);
  return topics.map((topic, index) => (
    <div key={topic.title}>
      <Link href={topic.path} passHref>
        <ChapterButton
          active={topic.title === activeTopic}
          description={topic.title}
          className={cn(topic.title === activeTopic ? "mt-3" : "mt-1")}
        />
      </Link>

      {index === topics.length - 1 ? null : (
        <div className="flex justify-center w-[80px] p-1">
          <Image
            src="/images/vertical-line.svg"
            alt="Image"
            width={3}
            height={21}
          />
        </div>
      )}
    </div>
  ));
};

export default TopicList;
