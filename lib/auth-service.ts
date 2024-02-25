import { currentUser } from "@clerk/nextjs";
import { db } from "./db";
import React from "react";

const getSelf = async () => {
  const self = await currentUser();
  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: {
      externalUserID: self.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export default getSelf;
