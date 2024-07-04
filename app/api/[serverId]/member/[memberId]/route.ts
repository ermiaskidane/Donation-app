import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format } from "date-fns";

import { db } from '@/lib/db';

export async function POST(
  req: Request,
  {params}: {params: { serverId: string, memberId: string}}
){
  try{
    const {userId} = auth()

    const body = await req.json();

    const { name, phone, email, amount} = body

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!phone) {
      return new NextResponse("Phone is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member id is required", { status: 400 });
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

    // note: we use deep nested query but only the admin can make this query so
    // there wont be much number of admins overall, optimazation will make less differnce with 
    // seperate query
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
  } catch(error){
    console.log('[MEMBER_POST]', error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: {serverId: string, memberId: string} }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member id is required", { status: 400 });
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

    const member = await db.server.update({
      where: {
        id: params.serverId
      },
      data: {
        members: {
          delete: {
            id: params.memberId
          }
        }
      }
    });
  
    return NextResponse.json(member);
  } catch (error) {
    console.log('[MEMBER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
