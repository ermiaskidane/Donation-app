import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: { year: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { description,paymentStatus, amount } = body;

    console.log("DDDDDDDDDDDDDDD",params.year)
    console.log("SSSSSSSSSSSSSSSS",body)
    console.log("SSSSSSSSSSSSSSSS",userId)


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!description) {
      return new NextResponse("description is required", { status: 400 });
    }

    if (!paymentStatus) {
      return new NextResponse("paymentStatus is required", { status: 400 });
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

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const expense = await db.year.update({
      where: {
        year: Number(params.year)
      }, 
      data: {
        expenses: {
          create:{ 
              description,
              paymentStatus,
              amount,
          }
        }
      }
    })

    console.log("££££££££££££££££", expense)
    return NextResponse.json(expense);
  } catch (error) {
    console.log('[EXPENSE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { year: string} }
) {
  try {
    const { userId } = auth();

    console.log("KLJLKLLLLLLLLLLLLLLL", params.year)
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.year) {
      return new NextResponse("year id is required", { status: 400 });
    }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId
      }
    });
 
    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }



    const expenses = await db.expense.delete({
      where: {
        id: params.year
      },
    });
  
    return NextResponse.json(expenses);
  } catch (error) {
    console.log('[Expense_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};