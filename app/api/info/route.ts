import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';

// GET ALL COMMENTS OF A POST
export const GET = async (req: Request) => {
  try {
    
    const Info = await db.info.findMany();

    return NextResponse.json(Info);
  } catch (err) {
    console.log("[INFO_ROUTES]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// // CREATE A INFO
export const POST = async (req: Request) => {
  try {
  // check if there is user
  const {userId} = auth()

  const body = await req.json();

  const { title} = body
  
  if(!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if(!title) {
    return new NextResponse("title is required", { status: 400 });
  }

  const UserAdmin = await db.user.findFirst({
    where: {
      userId
    }
  });

  if (UserAdmin?.role !== "ADMIN"){
    return new NextResponse("Unauthorized", { status: 405 });
  }
  
  const info = await db.info.create({
    data: {
      title
    },
  })

    return NextResponse.json(info);
  } catch (err) {
    console.log('[INFO_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export const DELETE = async(req: Request) =>  {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }


    const UserAdmin = await db.user.findFirst({
      where: {
        userId
      }
    });
 
    if (UserAdmin?.role !== "ADMIN"){
      return new NextResponse("Unauthorized", { status: 405 });
    }



    const info = await db.info.deleteMany({
      // where: {
      //   index: params.index
      // }
    });
  
    return NextResponse.json(info);
  } catch (error) {
    console.log('[INFO_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};