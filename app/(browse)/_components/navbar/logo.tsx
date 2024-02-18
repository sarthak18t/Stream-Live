import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const Logo = () => {
  return (
    <Link href="/">
      <div className="lg:flex items-center hidden hover:opacity-75 transition gap-x-4">
        <div className="bg-white rounded-full p-1">
          <Image src="/spooky.svg" alt="logo" width="32" height="32"></Image>
        </div>
        <div className={cn("flex flex-col items-center", font.className)}>
          <p className="text-xl font-semibold">SteamLive</p>
          <p className="text-sm text-muted-foreground">Let's Stream</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
