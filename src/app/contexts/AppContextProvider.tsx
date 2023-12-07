"use client";
import React, { createContext, useState } from "react";

// Define the shape of the context value
interface AppContext {
  currentChapter: string;
  setCurrentChapter: React.Dispatch<React.SetStateAction<string>>;
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
  const [currentChapter, setCurrentChapter] = useState<string>("");
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        currentChapter,
        setCurrentChapter,
        currentProgress,
        setCurrentProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
