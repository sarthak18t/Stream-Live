import { db } from "./db";
import getSelf from "./auth-service";

export const isBlockedByUser = async (userId: string) => {
  try {
    const self = await getSelf();
    if (!self) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    if (user.id === self.id) return false;

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId: self.id,
        },
      },
    });
    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const blockUser = async (userId: string) => {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");

  if (user.id === self.id) throw new Error("Cannot block yourself");

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: user.id,
      },
    },
  });

  if (existingBlock) throw new Error("You have already blocked this user");
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: user.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unBlockUser = async (userId: string) => {
  const self = await getSelf();
  if (!self) throw new Error("Unauthorized");
  const user = await db.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");
  if (user.id === self.id) throw new Error("Cannot unblock yourself");
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: user.id,
      },
    },
  });
  if (!existingBlock) throw new Error("You have not blocked this user");
  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    }, 
    include: {
      blocked: true,
    },
  });
  return unblock;
};
