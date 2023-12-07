"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { AppContext } from "./contexts/AppContextProvider";

export default function NavBar() {
  const { currentProgress } = React.useContext(AppContext)!;

  return (
    <>
      <div className="flex flex-row p-5 items-center">
        <Link href="/" passHref className="">
          <p className="nav-home">WONDERLAND</p>
        </Link>
        <div className="flex flex-grow justify-center">
          {currentProgress > 0 && (
            <Progress className="h-2 w-[540px]" value={currentProgress} />
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}
