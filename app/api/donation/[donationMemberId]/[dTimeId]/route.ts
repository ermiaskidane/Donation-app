import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import {db} from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { donationMemberId: string, dTimeId: string} }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { dtime, amount } = body;


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.donationMemberId) {
      return new NextResponse("donationMember id is required", { status: 400 });
    }

    if (!dtime) {
      return new NextResponse("dtime is required", { status: 400 });
    }

    if (!amount ) {
      return new NextResponse("amount are required", { status: 400 });
    }


    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      },
      include: {
        members: true
      }
    })

    // console.log("{{{{{{{{{{{{{{{{{{{", UserAdmin)

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
        update: {
          where: {
            id: params.dTimeId
          },
          data: {
           amount
          }
        }
      }
    }
   })
    // const donations = await db.donation.update({
    //   where: {
    //     id: params.dTimeId 
    //   },
    //   data: {
    //     amount,
    //   }
    // })
 
    return NextResponse.json(member);
  } catch (error) {
    console.log('[Donation_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};