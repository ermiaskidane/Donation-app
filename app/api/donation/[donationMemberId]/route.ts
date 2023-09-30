import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { donationMemberId: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { dtime, amount } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!dtime) {
      return new NextResponse("dtime is required", { status: 400 });
    }

    if (!amount ) {
      return new NextResponse("amount are required", { status: 400 });
    }

    if (!params.donationMemberId) {
      return new NextResponse("donationMember id is required", { status: 400 });
    }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      },
      include: {
        members: true
      }
    })

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const member = await db.member.update({
      where: {
        id: params.donationMemberId
      }, 
      data: {
        amount,
        donations: {
          create:{ 
              dtime: format(Date.now(), "MMMM do, yyyy"),
              amount,
          }
        }
      }
    })


    // const Donator = await db.donation.create({
    //   data: {
    //     dtime,
    //     amount,
    //     memberId: params.donationMemberId 
    //     }
    // })

    return NextResponse.json(member);
  } catch (error) {
    console.log('[DONATION_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};