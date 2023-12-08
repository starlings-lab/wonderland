"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { AppContext } from "./contexts/AppContextProvider";
import { X } from "lucide-react";

export default function NavBar() {
  const { currentProgress, setCurrentProgress } = React.useContext(AppContext)!;

  return (
    <>
      <div className="flex flex-row p-5 items-center">
        {currentProgress === 0 ? (
          <Link href="/" passHref>
            <p className="nav-home">WONDERLAND</p>
          </Link>
        ) : (
          <Link href="/dex" passHref>
            <X className="cursor-pointer" size={24} />
          </Link>
        )}

        <div className="flex flex-grow justify-center items-center">
          {currentProgress > 0 && (
            <Progress
              className="h-2 w-[540px] ml-5 mr-5"
              value={currentProgress}
            />
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}
