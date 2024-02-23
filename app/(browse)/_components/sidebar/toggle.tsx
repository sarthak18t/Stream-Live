"use client";
import React from "react";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed && (
        <div>
          <Hint label={label} asChild side="right">
            <Button
              onClick={onExpand}
              className=" hidden lg:flex pt-4 mb-4 w-full justify-center items-center"
              variant="ghost"
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-2 pl-6 flex flex-row">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} asChild side="right">
            <Button
              onClick={onCollapse}
              className=" p-2 h-auto ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
