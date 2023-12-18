"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface MultipleChoiceQuizProps {
  className?: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  onCorrectAnswer?: () => void;
  onSkip?: () => void;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  className,
  question,
  answers,
  correctAnswerIndex,
  onCorrectAnswer,
  onSkip,
}) => {
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const onAnswer = (value: string) => {
    setSelectedAnswer(value);
    if (value === answers[correctAnswerIndex]) {
      onCorrectAnswer && onCorrectAnswer();
    }
  };

  // track skipped state
  const [skipped, setSkipped] = React.useState(false);

  const correctAnswerSelected = selectedAnswer === answers[correctAnswerIndex];
  const onSkipped = () => {
    if (skipped || correctAnswerSelected) {
      return;
    }
    onSkip && onSkip();
    setSkipped(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className={cn("p-6 rounded-lg bg-[#F5F5F5] w-full", className)}>
        <div className="text-base font-light mb-4">{question}</div>
        <RadioGroup
          onValueChange={onAnswer}
          disabled={correctAnswerSelected || skipped}
        >
          {answers.map((answer, index) => (
            <div className="flex items-center space-x-2 p-1" key={index}>
              <RadioGroupItem value={answer} id={index.toString()} />
              <Label
                htmlFor={index.toString()}
                className="text-base font-light"
              >
                {answer}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {correctAnswerSelected ? (
          <div className="mt-5">
            <Label>🎉 Correct!</Label>
          </div>
        ) : (
          selectedAnswer && (
            <div className="mt-5">
              <Label>Incorrect, please try again!</Label>
            </div>
          )
        )}
      </div>
      <div
        className="flex flex-row w-full justify-end items-center cursor-pointer"
        onClick={onSkipped}
      >
        <div className="text-right mr-1 text-gray-400 font-bold">Skip</div>
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
