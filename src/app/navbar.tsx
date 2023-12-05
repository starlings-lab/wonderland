"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <>
      <NavigationMenu className="p-3">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" passHref>
              WONDERLAND
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator />
    </>
  );
}
