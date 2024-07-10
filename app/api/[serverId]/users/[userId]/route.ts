import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format } from "date-fns";

import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';

export async function PATCH(
  req: Request,
  {params}: {params: {serverId: string, userId: string}}
){
  try {
    const {userId: authenticatedUserId} = auth()

    const body = await req.json();

    const { type} = body


    if(!authenticatedUserId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    // first check if user role is ADMIN
    const UserAdmin = await db.user.findFirst({
      where: {
        userId: authenticatedUserId,
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

    const getUserRole = await db.position.findFirst({
      where: {
        serverId: params.serverId,
        userId: params.userId
      }
    })

    const updateUserRole = await db.position.update({
      where:{
        id: getUserRole?.id
      },
      data: {
        // to match with MemberRole need to capitalize the type
        role: type.toUpperCase() as MemberRole
      }
    })

    return NextResponse.json(updateUserRole);
  } catch(error) {
    console.log('[USERS_POST]', error)
    return new NextResponse("Internal Error", {status: 500})
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: {serverId: string, userId: string } }
) {

  try {
    const {userId: authenticatedUserId} = auth()

    if(!authenticatedUserId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.serverId) {
      return new NextResponse("Server id is required", { status: 400 });
    }

    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    // first check if user role is ADMIN
    const UserAdmin = await db.user.findFirst({
      where: {
        userId: authenticatedUserId,
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

    // Fetch the position of the user to be deleted in one query
    const userPosition = await db.position.findFirst({
      where: {
        userId: params.userId,
        serverId: params.serverId,
      },
    });

    if (!userPosition) {
      return new NextResponse("User position not found", { status: 404 });
    }

    // Delete the user position
    const deletedPosition = await db.position.delete({
      where: {
        id: userPosition.id,
      },
    });

    return NextResponse.json(deletedPosition);
  } catch (error) {
    console.log('[USERS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

