import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { donationMemberId: string } }
) {
  try {

    console.log("@@@@@@@@@@@@@@@@@" ,params.donationMemberId)

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

    // if (!currentMemberId) {
    //   return new NextResponse("Server ID missing", { status: 400 });
    // }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      },
      include: {
        members: true
      }
    })

    console.log("{{{{{{{{{{{{{{{{{{{", UserAdmin)

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const Donator = await db.donation.create({
      data: {
            dtime,
            amount,
            memberId: params.donationMemberId
        }
    })

    return NextResponse.json(Donator);
    // const donatorMember = await db.member.create({
    //   where: {
    //     userId,
    //     donation: {
    //       some:{
    //         memberId: params.donationMemberId
    //       }
    //     }
    //   },
    //   data: {
    //     donations:{
    //       create: { 
    //           dtime,
    //           amount,
    //           memberId: params.donationMemberId
    //       }
    //     }
    //   }
    // })

    // const donatorMember = await db.member.findFirst({
    //   where: {
    //     id: params.donationMemberId,
    //   }
    // })

    // console.log("donatorMember", donatorMember)

    // if (!donatorMember){
    //   return new NextResponse("Unauthorized", { status: 405 });
    // }

    // const donation = await db.donation.create({
    //   data: {
    //     dtime,
    //     amount,
    //     memberId: params.donationMemberId
    //   },
    // });
  
    // return NextResponse.json(donation);
  } catch (error) {
    console.log('[DONATION_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};