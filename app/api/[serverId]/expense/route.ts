import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params } : { params: {serverId: string}}
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { year } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!year ) {
      return new NextResponse("year is required", { status: 400 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }


    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const serverYearExpense = await db.server.update({
      where: {
        id: params.serverId
      },
      data: {
        years: {
          create: {
            year,
          }
        }
      }
    })

    return NextResponse.json(serverYearExpense);
  } catch (error) {
    console.log('[EXPENSE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};