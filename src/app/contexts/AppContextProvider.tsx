"use client";
import { Chapter, Topic } from "@/type/types";
import React, { createContext, useState } from "react";

// Define the shape of the context value
interface AppContext {
  currentChapter: Chapter | undefined;
  setCurrentChapter: React.Dispatch<React.SetStateAction<Chapter | undefined>>;
  currentTopic: Topic | undefined;
  setCurrentTopic: React.Dispatch<Topic>;
  currentProgress: number;
  setCurrentProgress: React.Dispatch<React.SetStateAction<number>>;
  completedTopics: Topic[];
  setCompletedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

// Create the context
export const AppContext = createContext<AppContext | null>(null);

// Create the provider component
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentChapter, setCurrentChapter] = useState<Chapter>();
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentTopic, setCurrentTopic] = useState<Topic>();
  const [completedTopics, setCompletedTopics] = useState<Topic[]>([]);

  const verifyAndSetCurrentTopic: React.Dispatch<Topic> = (topic) => {
    if (topic && !completedTopics.includes(topic)) {
      setCurrentTopic(topic);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentChapter,
        setCurrentChapter,
        currentTopic,
        setCurrentTopic: verifyAndSetCurrentTopic,
        currentProgress,
        setCurrentProgress,
        completedTopics,
        setCompletedTopics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
