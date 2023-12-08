"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface ChapterButtonProps {
  active: boolean;
  description: string;
  className?: string;
}

const ChapterButton: React.FC<ChapterButtonProps> = ({
  active,
  description,
  className,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex justify-center items-center">
        <Image
          src="/images/start-active-bg.svg"
          alt="Image"
          width={80}
          height={70}
          className={active ? "" : "invisible"}
        />
        <Image
          id="start"
          src="/images/start-inactive.svg"
          alt="Image"
          width={56}
          height={80}
          className={cn("absolute", active ? "invisible" : "")}
        />
        <Image
          id="start-active"
          src="/images/start-active.svg"
          alt="Image"
          width={56}
          height={68}
          className={cn(
            "absolute mt-[-20px] transform hover:scale-110 hover:cursor-pointer transition-transform duration-200",
            active ? "" : "invisible"
          )}
        />
      </div>
      <Label htmlFor="start">{description}</Label>
    </div>
  );
};

export default ChapterButton;
