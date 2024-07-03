import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const {userId} = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    // find the user of the creater server 
    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    // if (UserAdmin?.role !== "ADMIN"){
    //   return new NextResponse("Unauthorized", { status: 405 });
    // }

    // if user is not creator of this server it want pass this query
    const server = await db.server.update({
      where: {
        id: params.serverId,
        userId: UserAdmin?.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[INVITE_CODE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}