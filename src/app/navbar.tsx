"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { AppContext } from "./contexts/AppContextProvider";
import { X } from "lucide-react";

export default function NavBar() {
  const { currentProgress, currentChapter, currentTopic } =
    React.useContext(AppContext)!;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white bg-opacity-100">
      <div className="flex flex-row p-5 ml-10 items-center">
        {currentProgress === 0 ? (
          <Link href="/" passHref>
            <p className="nav-home">WONDERLAND</p>
          </Link>
        ) : (
          <Link href={currentChapter ? currentChapter.path : ""} passHref>
            <X className="cursor-pointer" size={24} />
          </Link>
        )}

        <div className="flex flex-grow justify-center items-center">
          {!currentTopic?.isPlayground && currentProgress > 0 && (
            <Progress
              className="h-2 w-[540px] ml-5 mr-5 bg-[#E5E5E5]"
              indicatorBackgroundColor="bg-[#00BCD4]"
              value={currentProgress}
            />
          )}
        </div>
      </div>
      <Separator />
    </nav>
  );
}
