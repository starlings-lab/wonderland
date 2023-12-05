"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Progress } from "@/components/ui/progress";
import { NavigationMenuContent } from "@radix-ui/react-navigation-menu";

export default function NavBar() {
  return (
    <>
      <NavigationMenu className="p-5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              <p className="nav-home">WONDERLAND</p>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Progress value={50} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </>
  );
}
