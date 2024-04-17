import { db } from "./db";
import getSelf from "./auth-service";
import { currentUser } from "@clerk/nextjs";

export const isFollowingUser = async (userId: string) => {
  try {
    const self = await getSelf();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");
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

    const selfUser = await db.user.findUnique({
        where:{
          externalUserID : self.id
        }
    })

  if(!selfUser) throw new Error("User not found")

  if(user.id === selfUser.id)throw new Error("Cannot follow yourself")
  
  const existingFollow = await db.follow.findFirst({
    where:{
        followerId: selfUser.id,
        followingId: user.id
    }
  })

  if(existingFollow)throw new Error("Already following")
    
    console.log(selfUser.id)
  const follow = await db.follow.create({
    data:{
        followerId: selfUser.id,
        followingId: user.id
    },
    include:{
        following: true,
        follower:true
    }
  })
  return follow
}
