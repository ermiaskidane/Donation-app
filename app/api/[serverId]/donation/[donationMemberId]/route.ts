import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { serverId: string, donationMemberId: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { dtime, amount } = body;

    // change the string dtime to Date type dtime
    const dt = parseISO(dtime)

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!dtime) {
      return new NextResponse("dtime is required", { status: 400 });
    }

    if (!amount ) {
      return new NextResponse("amount are required", { status: 400 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.donationMemberId) {
      return new NextResponse("donationMember id is required", { status: 400 });
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

    // check if the serverId is correct from the frontEnd else return error
    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
      }
    })

    if(!server) {
      return new NextResponse("server not found", { status: 405 });
    }
 
    const member = await db.member.update({
      where: {
        id: params.donationMemberId
      }, 
      data: {
        amount,
        donations: {
          create:{ 
              dtime: format(dt, "MMMM do, yyyy"),
              amount,
          }
        }
      }
    })

    return NextResponse.json(member);
  } catch (error) {
    console.log('[DONATION_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};