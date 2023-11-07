import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { year } = body;

    // console.log("DDDDDDDDDDDDDDD",params.year)
    console.log("SSSSSSSSSSSSSSSS",body)
    console.log("SSSSSSSSSSSSSSSS",userId)


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!year ) {
      return new NextResponse("year is required", { status: 400 });
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

    const YearExpense = await db.year.create({
      data: {
        year
      }
    })

    console.log("££££££££££££££££", YearExpense)
    return NextResponse.json(YearExpense);
  } catch (error) {
    console.log('[EXPENSE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};