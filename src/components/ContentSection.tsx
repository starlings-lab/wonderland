import React from "react";
import Image from "next/image";
import MultipleChoiceQuiz, {
  MultipleChoiceQuizProps,
} from "./MultipleChoiceQuiz";

export interface ImageContent {
  src: string;
  width: number;
  height: number;
}

export interface QuizContent extends MultipleChoiceQuizProps {}

export type Content = string | ImageContent | QuizContent;

type ContentSectionProps = {
  contents: Content[];
  className?: string;
};

export function isQuizContent(content: Content): content is QuizContent {
  return typeof content === "object" && "question" in content;
}

export function isImageContent(content: Content) {
  return typeof content === "object" && "src" in content;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  className,
  contents,
}) => {
  const children = contents.map((content, index) => {
    // if content is an image, render an Image component
    if (isImageContent(content)) {
      const { src, width, height } = content as ImageContent;
      return (
        <div className="flex justify-center p-1 mt-5 mb-5" key={index}>
          <Image alt="Image" src={src} width={width} height={height} />
        </div>
      );
    }

    // if content is a quiz, render a MultipleChoiceQuiz component
    if (isQuizContent(content)) {
      return <MultipleChoiceQuiz key={index} {...content} />;
    }

    // otherwise, render a string
    const text = content as string;
    return (
      <div key={index} className="mt-5">
        {text}
      </div>
    );
  });

  return <div className={className}>{children}</div>;
};

export default ContentSection;
