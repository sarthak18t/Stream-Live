"use server"

import { followUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache";

export const onFollow = async(id:string)=>{
    try {
        const followedUser = await followUser(id);

        revalidatePath("/")
        if(followedUser)revalidatePath(`/${followedUser.following.username}`)
        
        return followedUser
    } catch (error:any) {
        console.log(error)
        throw new Error("Internal error",error)
    }
}