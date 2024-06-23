import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format, parseISO } from "date-fns";

import {db} from '@/lib/db';

export async function POST(
  req: Request,
  { params }: { params: {serverId: string, yearId: string } }
) {
  try {

    const { userId } = auth();

    const body = await req.json();

    const { description,paymentStatus, amount } = body;


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

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.yearId) {
      return new NextResponse("Year id is required", { status: 400 });
    }


    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
      }
    })

    if(!server) {
      return new NextResponse("server not found", { status: 405 });
    }

    const expense = await db.year.update({
      where: {
        id: params.yearId
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

    return NextResponse.json(expense);
  } catch (error) {
    console.log('[EXPENSE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: {serverId: string, yearId: string} }
) {
  try {
    const { userId } = auth();



    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.yearId) {
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

    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
      }
    })

    if(!server) {
      return new NextResponse("server not found", { status: 405 });
    }

    // note: params.yearId is not the year Schema Id from the frontEnd 
    // it send as Id of Expesne schema
    const expenses = await db.expense.delete({
      where: {
        id: params.yearId 
      },
    });
  
    return NextResponse.json(expenses);
  } catch (error) {
    console.log('[Expense_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};