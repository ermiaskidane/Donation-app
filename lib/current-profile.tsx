
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Position, Server, User } from "@prisma/client";

type UserProfile = User & {
  server: Server & {
    positions: Position[];
  } | null;
};

export const currentProfile = async (serverId: string): Promise<UserProfile | null> => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    return null;
  }
  
// ignore userId bc user with member Role will not get access for this server  
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      // userId: profile.id,
    },
    include: {
      positions: true,
    },
  });

  return { ...profile, server };
};