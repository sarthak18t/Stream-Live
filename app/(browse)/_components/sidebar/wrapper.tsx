"use client";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

interface WrrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside
      className={cn(
        "left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
