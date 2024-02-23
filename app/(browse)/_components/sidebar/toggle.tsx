"use client";
import React from "react";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {
        collapsed && (
          <div>
            <Button
              onClick={onExpand}
              className=" hidden lg:flex pt-4 mb-4 w-full justify-center items-center"
              variant="ghost"
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </div>
        )
      }
      {!collapsed && (
        <div className="p-2 pl-6 flex flex-row">
          <p className="font-semibold text-primary">For you</p>
          <Button
            onClick={onCollapse}
            className=" p-2 h-auto ml-auto"
            variant="ghost"
          >
            <ArrowLeftFromLine className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};

export default Toggle;
