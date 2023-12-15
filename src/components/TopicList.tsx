import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopicButton from "./TopicButton";
import { cn } from "@/lib/utils";
import { Topic } from "@/type/types";

interface TopicListProps {
  topics: Topic[];
  activeTopic: Topic;
  completedTopics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  activeTopic,
  completedTopics,
}) => {
  console.log("Active topic: ", activeTopic);
  return topics.map((topic, index) => (
    <div key={topic.title}>
      <Link href={topic.path} passHref>
        <TopicButton
          active={activeTopic && topic.title === activeTopic.title}
          description={topic.title}
          completed={completedTopics.includes(topic)}
          isPlayground={topic.isPlayground}
          className={cn(
            activeTopic && topic.title === activeTopic.title ? "mt-3" : "mt-1"
          )}
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
