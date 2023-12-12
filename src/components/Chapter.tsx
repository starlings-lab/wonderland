"use client";

import React, { ReactElement, ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/contexts/AppContextProvider";
import ContentSection, {
  Content,
  isQuizContent,
} from "@/components/ContentSection";

export interface Section {
  contents: Content[];
}

type ChapterProps = {
  className?: string;
  title: string;
  sections: Section[];
};

const Chapter: React.FC<ChapterProps> = ({ className, title, sections }) => {
  const router = useRouter();
  const { setCurrentChapter, setCurrentProgress } =
    React.useContext(AppContext)!;

  // state to show/hide question content
  const totalQuestions = sections.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  useEffect(() => {
    setCurrentChapter(title);
    setCurrentProgress((currentQuestion / totalQuestions) * 100);
  });

  const onContinue = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentProgress((nextQuestion / totalQuestions) * 100);

    // route to review page when currentQuestion is the last question
    if (nextQuestion > totalQuestions) {
      router.push("/dex/pricing/review");
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
      (content) => !isQuizContent(content)
    );

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-xl h-fit mt-5 border-none shadow-none">
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
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
  );
};

export default Chapter;
