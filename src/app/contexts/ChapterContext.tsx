// ChapterContext.tsx
import React from "react";

type ChapterContextType = {
  onContinue: () => void;
};

const ChapterContext = React.createContext<ChapterContextType | undefined>(
  undefined
);

export default ChapterContext;
