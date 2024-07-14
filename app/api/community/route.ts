import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import {db} from '@/lib/db';
import { MemberRole } from '@prisma/client';

export async function POST(
  req: Request,
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { name,imageUrl } = body;

    // Ensure the name is lowercase
    const lowerCaseName = name.toLowerCase();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("description is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("paymentStatus is required", { status: 400 });
    }


    const User = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (!User) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // change user to admin on creation of server
    // if (User?.role !== "ADMIN"){
    //   await db.user.update({
    //     where: {
    //       id: User?.id
    //     },
    //     data: {
    //       role: "ADMIN"
    //     }
    //   })
    //   // return new NextResponse("Unauthorized", { status: 405 });
    // }

    // TODO: Change the default Phone and amount
    const server = await db.server.create({
      data: {
        name: lowerCaseName,
        imageUrl,
        inviteCode: uuidv4(),
        userId: User!.id,
        positions: {
          create: [
            {userId: User.id, role: MemberRole.ADMIN }
          ]
        },
        members: {
          create: [
            {
              name: User!.name,
              phone: "072346218",
              email: User!.email,
              amount: 10.00,
              userId: User!.id,
              donations : {
                create: [
                  {
                    amount: 10.00,
                    dtime: format(Date.now(), "MMMM do, yyyy"),
                  }
                ]
              }
            }
          ]
        }
      }
    })
    console.log("fdggd", server)
    return NextResponse.json(server);
  } catch (error) {
    console.log('[COMMUNITY_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
