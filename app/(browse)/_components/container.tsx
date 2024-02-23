"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
import React from "react";
import { useEffect } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { collapsed,onExpand,onCollapse } = useSidebar((state) => state);
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(()=>{
    if(matches){
      onCollapse()
    }
    else{
      onExpand()
    }
  },[matches,onCollapse,onExpand])

  return (
    <div className={cn("flex-1", collapsed ? "w-[70px]" : "w-[70px] lg:w-60")}>
      {children}
    </div>
  );
};

export default Container;
