import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";


interface UserItemProps {
  username: string;
  imageURL: string;
  isLive?: boolean;
}

const UserItem = ({ username, imageURL, isLive }: UserItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);
  console.log(pathname);
  const href = `/${username}`;
  const isActive = pathname === href;
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href} className="flex flex-row items-center justify-between gap-x-4">
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar username={username} imageURL={imageURL} isLive={true}  />
        </div>
    {!collapsed && <p className="text-sm truncate w-full">{username}</p>}
      </Link>
    </Button>
  );
};

export default UserItem;
