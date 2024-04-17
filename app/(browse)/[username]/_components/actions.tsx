"use client"

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onFollow } from "@/actions/follow";
import { toast } from "sonner";

interface ActionProps {
    isFollowing: boolean,
    userId: string
}
export const Actions = ({isFollowing,userId}:ActionProps) =>{
    const [isPending, startTransition] = useTransition();

    const onClick = ()=>{
        startTransition(()=>{
            onFollow(userId)
            .then((data)=>toast.success(`You are now following ${data?.following.username} `))
            .catch(()=>toast.error("Something went wrong"))
        });
    }
    return (
        <Button disabled={isPending || isFollowing} onClick={onClick} variant="primary">
            Follow
        </Button>
    )
}