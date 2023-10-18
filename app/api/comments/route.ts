import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

// GET ALL COMMENTS OF A POST
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)

    const postSlug = searchParams.get('postSlug')
  
    if (!postSlug) {
      return new NextResponse("postSlug is required", { status: 400 });
    }

    const comments = await db.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    })

  //   return NextResponse.json(server);
  // } catch (error) {
  //   console.log("[CHANNEL_ID_DELETE]", error);
  //   return new NextResponse("Internal Error", { status: 500 });
  // }
    return NextResponse.json(comments)
    // return new NextResponse(JSON.stringify(comments, { status: 200 }))
  } catch (err) {
    console.log("[CHANNEL_ID_DELETE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// CREATE A COMMENT
export const POST = async (req: Request) => {
  try {
  // check if there is user
  const {userId} = auth()

  const body = await req.json();

  console.log("LLLLLLLLLLLLLLLLLLAAAAAAAAA", auth())

  console.log("SSSSSSSSSSSSSSSSSSSSSSSSS", body)

  const { desc, postSlug} = body

  
  if(!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if(!desc) {
    return new NextResponse("desc is required", { status: 400 });
  }
  if(!postSlug) {
    return new NextResponse("postSlug is required", { status: 400 });
  }

  const user = await db.user.findFirst({
    where: {
      userId
    }
  });

  console.log("::::::::::::::::::", user)

  // Handle the possibility that user?.email is undefined
  const userEmail = user?.email || "default@example.com";

  if(userEmail === "default@example.com") {
    return new NextResponse("userEmail can not be null", { status: 400 });
  }
  
  const comment = await db.comment.create({
    data: {
      desc,
      postSlug,
      userEmail
    },
    include: {
      user: true,
      post: true
    }
  })

    return NextResponse.json(comment);
  } catch (err) {
    console.log('[MEMBER_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}