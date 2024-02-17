import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const Logo = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <div className="bg-white rounded-full p-1">
        <Image src="/spooky.svg" alt="logo" width="80" height="80"></Image>
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">SteamLive</p>
        <p className="text-sm text-muted-foreground">Let's Stream</p>
      </div>
    </div>
  );
};

export default Logo;
