import React from "react";
import { notFound } from "next/navigation";
import { getUserByUserName } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { Actions } from "./_components/actions";
interface UserPageProps {
  params: {
    username: string;
  };
}
const page = async ({ params }: UserPageProps) => {
  const user = await getUserByUserName(params.username);
  
  if (!user) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  // if (isBlocked) {
  //   notFound();
  // }
  return (
    <div>
      <p>User name : {user.username}</p>
      <p>User id : {user.id}</p>
      <p>isFollowing : {isFollowing.toString()}</p>
      <p>is Blocked by user : {isBlocked.toString()}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default page;
