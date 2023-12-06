"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import React from "react";

export default function NavBar() {
  const [progress, setProgress] = React.useState(0);

  return (
    <>
      <NavigationMenu className="p-5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              <p className="nav-home">WONDERLAND</p>
            </Link>
          </NavigationMenuItem>
          {progress > 0 && (
            <NavigationMenuItem className="w-2/3">
              <Progress className="ml-10 w-[800px]" value={progress} />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </>
  );
}
