import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LiveBadge from "./live-badge";

const AvatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof AvatarSizes> {
  username: string;
  imageURL: string;
  isLive?: boolean;
  showBadge?: boolean;
}
const UserAvatar = ({
  username,
  imageURL,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          AvatarSizes({ size }),
          isLive && "ring-2 ring-red-500 border border-background"
        )}
      >
        <AvatarImage src={imageURL} />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
       {canShowBadge && (
            <div className="absolute -bottom-3 ">
                <LiveBadge/>
            </div>
       )}
       </div>
  );
};

export default UserAvatar;
