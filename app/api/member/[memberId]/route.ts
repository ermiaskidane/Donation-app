import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format } from "date-fns";

import { db } from '@/lib/db';

export async function POST(
  req: Request,
  {params}: {params: {memberId: string}}
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

    if (!params.memberId) {
      return new NextResponse("Member id is required", { status: 400 });
    }


    // first check if user role is ADMIN
    const UserAdmin = await db.user.findFirst({
      where: {
        userId,
      }
    })

    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const member = await db.member.create({
      data: {
        name,
        phone,
        email,
        amount,
        userId: UserAdmin.id,
        donations: {
          create: {
              dtime: format(Date.now(), "MMMM do, yyyy"),
              amount,
          }
        }
      },
      include: {
        donations: true
      }
    })

    return NextResponse.json(member);
  } catch(error){
    console.log('[MEMBER_POST]', error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string} }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.memberId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const UserAdmin = await db.user.findFirst({
      where: {
        userId
      }
    });
 
    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await db.member.delete({
      where: {
        id: params.memberId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[MEMBER_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
