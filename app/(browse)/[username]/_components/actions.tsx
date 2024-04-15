"use client"

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onFollow } from "@/actions/follow";

interface ActionProps {
    isFollowing: boolean
}
export const Actions = async({isFollowing}:ActionProps) =>{
    const [isPending, startTransition] = useTransition();

    const onClick = ()=>{
        startTransition(()=>{
            onFollow("123")
        });
    }
    return (
        <Button disabled={isPending || isFollowing} onClick={onClick} variant="primary">
            Follow
        </Button>
    )
}