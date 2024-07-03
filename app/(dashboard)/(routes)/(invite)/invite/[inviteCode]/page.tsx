import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodeProps {
  params: {
    serverId: string;
    inviteCode: string;
  };
};

const InviteCode = async ({
  params
}: InviteCodeProps) => {

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

  if (!params.inviteCode) {
    return redirect("/");
  }

  // check the user if he/she is part of the server/community
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      positions: {
        some:{
          userId: profile.id
        }
      }
    }
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // join user to server
  const server = await db.server.update({
    where:{
      inviteCode: params.inviteCode,
    },
    data:{
      positions: {
        create: [
          {
            userId: profile.id,
            role: "MEMBER",
          }
        ]
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}

export default InviteCode;