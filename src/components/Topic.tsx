"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";
import ContentSection, {
  Content,
  isQuizContent,
  isReactElementContent,
} from "@/components/ContentSection";
import TopicContext from "@/app/contexts/TopicContext";

export interface Section {
  contents: Content[];
}

type TopicProps = {
  className?: string;
  title: string;
  sections: Section[];
};

const Topic: React.FC<TopicProps> = ({ className, sections, title }) => {
  const router = useRouter();
  const { setCurrentProgress, currentTopic, currentChapter } =
    React.useContext(AppContext)!;

  // state to show/hide question content
  const totalQuestions = sections.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  useEffect(() => {
    setCurrentProgress((currentQuestion / totalQuestions) * 100);
  });

  const onContinue = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentProgress((nextQuestion / totalQuestions) * 100);

    // route to review page when currentQuestion is the last question
    if (nextQuestion > totalQuestions) {
      const reviewPath = `${currentTopic!.path}/review`;
      console.log("route to review: ", reviewPath);
      router.push(reviewPath);
    }

    // scroll to end of content
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  // add onContinue & onSkip callbacks to quiz questions and supporting content
  const sectionList = sections.map((section, index) => {
    section.contents.forEach((content) => {
      if (typeof content === "object" && "question" in content) {
        content.onCorrectAnswer = onContinue;
        content.onSkip = onContinue;
      }
    });

    return (
      currentQuestion >= index + 1 && (
        <ContentSection key={index} contents={section.contents} />
      )
    );
  });

  // On display continue button when there is no quiz content in a section
  const continueButton =
    currentQuestion <= totalQuestions &&
    sections[currentQuestion - 1].contents.every(
      (content) => !isQuizContent(content) && !isReactElementContent(content)
    );

  return (
    <TopicContext.Provider value={{ onContinue }}>
      <div className="flex flex-col items-center">
        <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {sectionList}
            {continueButton && (
              <div className="flex flex-row justify-center items-center">
                <Button className="mt-5" onClick={onContinue}>
                  Continue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TopicContext.Provider>
  );
};

export default Topic;
