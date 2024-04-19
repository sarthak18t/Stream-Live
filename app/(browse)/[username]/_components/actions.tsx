"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}
export const Actions = ({ isFollowing, userId}: ActionProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data?.following.username} `)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
        onUnfollow(userId)
          .then((data) =>
            toast.success(`You unfollowed  ${data?.following.username} `)
          )
          .catch(() => toast.error("Something went wrong"));
      });
  };

  const onClickFollow = () =>{isFollowing ? handleUnfollow() : handleFollow()} ;

  const handleBlock = () => {
    startTransition(()=>{
      onBlock(userId)
      .then((data)=>{
        toast.success(`You blocked ${data?.blocked.username} `)
      })
      .catch(()=> toast.error("Something went wrong"))
    })
  }

  const handleUnBlock = () => {
    startTransition(()=>{
      onUnblock(userId)
      .then((data)=>{
        toast.success(`You unblocked ${data?.blocked.username} `)
      })
      .catch(()=> toast.error("Something went wrong"))
    })
  }

  // const onClickBlock = () => {isBlocked ? handleUnBlock() : handleBlock()};
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={onClickFollow}
        variant="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleUnBlock}>
        Block
      </Button>
    </div>
  );
};
