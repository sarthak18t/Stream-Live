import { db } from "./db";
import getSelf from "./auth-service";
import { currentUser } from "@clerk/nextjs";
import { AwardIcon } from "lucide-react";

export const isFollowingUser = async (userId: string) => {
  try {
    const self = await getSelf();

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");
    if (user.id === self.id) return true;
    console.log(self.id)
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: user.id,
      },
    });
    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (userId: string) => {
  const self = await currentUser();

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  if (!self) throw new Error("Unauthorized");

  const selfUser = await db.user.findUnique({
    where: {
      externalUserID: self.id,
    },
  });

  if (!selfUser) throw new Error("User not found");

  if (user.id === selfUser.id) throw new Error("Cannot follow yourself");

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: selfUser.id,
      followingId: user.id,
    },
  });

  if (existingFollow) throw new Error("Already following");

  const follow = await db.follow.create({
    data: {
      followerId: selfUser.id,
      followingId: user.id,
    },
    include: {
      following: true,
      follower: true,
    },
  });
  return follow;
};

export const unfollowUser = async (userId: string) => {

  const self = await currentUser();
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if(!self)throw new Error("Unauthorized");
  if(!user)throw new Error("User not found");
  console.log(user?.id)
  console.log(self?.id)
  const selfUser = await db.user.findFirst({
    where: {
      externalUserID: self?.id,
    },
  })
  if (!selfUser) throw new Error("User not found");
  if(selfUser.id === user.id) throw new Error("Cannot unfollow yourself");
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: selfUser.id,
      followingId: user.id,
    },
  })

  if(!existingFollow) throw new Error("Not following");

  const unfollow = await db.follow.delete({
    where: {
      id : existingFollow.id
    },
    include:{
      following: true,
    }
  })
  return unfollow
};
