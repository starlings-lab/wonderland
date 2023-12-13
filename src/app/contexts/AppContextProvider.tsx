"use client";
import React, { createContext, useState } from "react";
import { Chapter, Topic } from "../data/staticDataService";

// Define the shape of the context value
interface AppContext {
  currentChapter: Chapter | undefined;
  setCurrentChapter: React.Dispatch<React.SetStateAction<Chapter | undefined>>;
  currentTopic: Topic | undefined;
  setCurrentTopic: React.Dispatch<React.SetStateAction<Topic | undefined>>;
  currentProgress: number;
  setCurrentProgress: React.Dispatch<React.SetStateAction<number>>;
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

  return (
    <AppContext.Provider
      value={{
        currentChapter,
        setCurrentChapter,
        currentTopic,
        setCurrentTopic,
        currentProgress,
        setCurrentProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
