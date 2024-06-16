import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { name,email, phone, amount } = body;

    console.log(body)


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("phone is required", { status: 400 });
    }

    if (!amount ) {
      return new NextResponse("amount are required", { status: 400 });
    }


    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const expense = await db.server.update({
      where: {
        id: params.serverId
      }, 
      data: {
        members: {
          create:{ 
              name,
              phone,
              email,
              amount,
              userId: UserAdmin.id,
              donations: {
                create: [
                  {
                    dtime: format(Date.now(), "MMMM do, yyyy"),
                    amount,
                  }
                ]
              }
          }
        }
      }
    })

    return NextResponse.json(expense);
  } catch (error) {
    console.log('[EXPENSE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
