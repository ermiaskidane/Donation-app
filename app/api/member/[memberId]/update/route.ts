import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import {db} from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string} }
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

    if (!params.memberId) {
      return new NextResponse("Member id is required", { status: 400 });
    }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    // console.log("???????????????", UserAdmin.role)

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const members = await db.member.update({
      where: {
        id: params.memberId,
      },
      data:{
        name,
        email,
        phone,
        amount
      }
    });

  
    return NextResponse.json(members);
  } catch (error) {
    console.log('[MEMBER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};