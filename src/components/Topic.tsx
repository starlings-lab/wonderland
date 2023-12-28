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
}

type TopicProps = {
  className?: string;
  topic: Topic;
  sections: Section[];
  // Custom label for continue button
  buttonLabel?: string;
  // There is no review page for playground
  disableReview?: boolean;
  onNextQuestion?: (nextQuestion: number) => void;
};

const Topic: React.FC<TopicProps> = ({
  className,
  sections,
  topic,
  buttonLabel,
  disableReview,
  onNextQuestion,
}) => {
  const router = useRouter();
  const { setCurrentProgress } = React.useContext(AppContext)!;

  // state to show/hide question content, review should be considered as last question
  const totalQuestions = sections.length + (disableReview ? 0 : 1);
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
    if (!disableReview && nextQuestion >= totalQuestions) {
      const reviewPath = `${topic!.path}/review`;
      console.log("route to review: ", reviewPath);
      router.push(reviewPath);
    }

    onNextQuestion?.(nextQuestion);

    if (!(currentQuestion === 3 && topic.title == "Buying & Selling") && !(currentQuestion === 3 && topic.title == "Liquidity Provision")) {
      setTimeout(() => {
        const nextSection = document.querySelector(`.section-${nextQuestion}`);
        nextSection?.scrollIntoView({ behavior: "smooth" });
      });
    }
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
        <TopicSection
          className={`animate-fade section-${index + 1}`}
          key={index}
          contents={section.contents}
        />
      )
    );
  });

  // Question starts from 1 and there is additional question for review page for some topics,
  // so currentSectionIndex should be at most sections.length - 1
  const currentSectionIndex = Math.min(
    currentQuestion - 1,
    sections.length - 1
  );

  // Only display continue button when there is no quiz content in a section
  const continueButton =
    currentQuestion <= totalQuestions &&
    sections[currentSectionIndex].contents.every(
      (content) => !isQuizContent(content) && !isReactElementContent(content)
    );

  return (
    <TopicContext.Provider value={{ onContinue }}>
      <div className="flex flex-col items-center animate-fade">
        <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
          <CardHeader>
            <CardTitle>{topic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {sectionList}
            {continueButton && (
              <div className="flex flex-row justify-center items-center">
                <Button className="mt-5 animate-fade" onClick={onContinue}>
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
