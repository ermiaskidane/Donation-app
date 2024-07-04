import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { format, parseISO } from "date-fns";

import {db} from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: {serverId: string, memberId: string} }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, phone, email, amount } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone ) {
      return new NextResponse("phone are required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("amount id is required", { status: 400 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member id is required", { status: 400 });
    }

    // first check if user role is ADMIN
    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (!UserAdmin){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const userRole = await db.position.findFirst({
      where: {
        serverId: params.serverId,
        userId: UserAdmin.id
      }
    })

    if (userRole?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // find the server which the member is in
    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
      }
    })

    if (!server){
      return new NextResponse("Server does not exist", { status: 405 });
    }

    const members = await db.member.update({
      where:{
        id: params.memberId,
        serverId: server.id,
      },
      data:{
          name,
          email,
          phone,
          amount,
      }
    })

    // ##### BREAK CODE #########
    // Intentional code paste to break from hosting in vercel
    // I can remove once ready to production
    const donations = await db.donation.update({
      where: {
        id: params.dTimeId 
      },
      data: {
        amount,
      }
    })
    // ##### BREAK CODE #########

    return NextResponse.json(members);
  } catch (error) {
    console.log('[MEMBER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};