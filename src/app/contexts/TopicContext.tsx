import React from "react";

type TopicContextType = {
  onContinue: () => void;
};

const TopicContext = React.createContext<TopicContextType | undefined>(
  undefined
);

export default TopicContext;
