"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";
import TopicSection, {
  Content,
  isQuizContent,
  isReactElementContent,
} from "@/components/TopicSection";
import TopicContext from "@/app/contexts/TopicContext";
import { Topic } from "@/type/types";

export interface Section {
  contents: Content[];
  // Indicates if this section is a playground
  playground?: boolean;
}

type TopicProps = {
  className?: string;
  topic: Topic;
  sections: Section[];
  // Custom label for continue button
  buttonLabel?: string;
  // There is no review page for playground
  disableReview?: boolean;
};

const Topic: React.FC<TopicProps> = ({
  className,
  sections,
  topic,
  buttonLabel,
  disableReview,
}) => {
  const router = useRouter();
  const { setCurrentProgress } = React.useContext(AppContext)!;

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

    // When review is no disabled,
    // route to review page when currentQuestion is the last question
    if (!disableReview && nextQuestion > totalQuestions) {
      const reviewPath = `${topic!.path}/review`;
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
        <TopicSection key={index} contents={section.contents} />
      )
    );
  });

  // Only display continue button when there is no quiz content in a section
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
            <CardTitle>{topic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {sectionList}
            {continueButton && (
              <div className="flex flex-row justify-center items-center">
                <Button className="mt-5" onClick={onContinue}>
                  {buttonLabel ?? "Continue"}
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
