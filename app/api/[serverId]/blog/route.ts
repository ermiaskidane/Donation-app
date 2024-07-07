import { NextResponse } from 'next/server';
import { auth, currentUser } from "@clerk/nextjs/server";
import {db} from '@/lib/db';
import { create } from 'domain';

// CREATE A POST
export async function POST (
  req: Request,
  { params } : { params: {serverId: string}}
)  {
  try {
    
  const { userId } = auth();

  const body = await req.json();

  const { title, desc, slug, catSlug, img} = body

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if (!title) {
    return new NextResponse("title is required", { status: 400 });
  }

  if (!desc ) {
    return new NextResponse("desc are required", { status: 400 });
  }

  if (!slug) {
    return new NextResponse("slug is required", { status: 400 });
  }

  if (!catSlug ) {
    return new NextResponse("catSlug are required", { status: 400 });
  }

  if (!params.serverId) {
    return new NextResponse("Server id is required", { status: 400 });
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

  const server = await db.server.update({
    where: {
      id: params.serverId
    },
    data: {
      posts: {
        create: {
          title, 
          desc,
          img, 
          slug, 
          catSlug,
          userEmail: UserAdmin.email
        }
      }
    }
  })

  return NextResponse.json(server);
  } catch(error) {
    console.log('[BLOG_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
