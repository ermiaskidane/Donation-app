import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { format } from "date-fns";

import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';

// export async function GET(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     if (!params.userId) {
//       return new NextResponse("user id is required", { status: 400 });
//     }

//     const userRole = await db.user.findUnique({
//       where: {
//         userId: params.userId
//       },
//       select:{
//         role: true
//       }
//     });

//     // console.log("''''''''''''''", userRole)
  
//     return NextResponse.json(userRole);
//   } catch (error) {
//     console.log('[BILLBOARDS_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

export async function PATCH(
  req: Request,
  {params}: {params: {userId: string}}
){
  try {
    const {userId} = auth()

    const body = await req.json();

    const { type} = body


    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    if (!params.userId) {
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

    const updateUserRole = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        // to match with MemberRole I have to capitalize the type
        role: type.toUpperCase() as MemberRole
      }
    })

    return NextResponse.json(updateUserRole);
  } catch(error) {
    console.log('[USERS_POST]', error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

