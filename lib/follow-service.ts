import { db } from "./db";
import getSelf from "./auth-service";
import { currentUser } from "@clerk/nextjs";

export const isFollowingUser = async (userId: string) => {
  try {
    const self = await getSelf();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) return "User not found";
    if (user.id === self.id) return true;

    const existingFollow = await db.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: user.id
        }
    })
    return !!existingFollow
  } catch (error) {
    return false;
  }
};

export const followUser = async (userId: string) => {
  const self = await currentUser();

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if(!user)throw new Error("User not found")
  if(!self)throw new Error("Unauthorized")

  if(user.id === self.id)throw new Error("Cannot follow yourself")
  
  const existingFollow = await db.follow.findFirst({
    where:{
        followerId: self.id,
        followingId: user.id
    }
  })

  if(existingFollow)throw new Error("Already following")

  const follow = await db.follow.create({
    data:{
        followerId: self.id,
        followingId: user.id
    },
    include:{
        following: true,
        follower:true
    }
  })

  return follow
}
