import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

// CREATE A COMMENT
export const POST = async (req: Request, 
  {params}: {params: {userId: string}}) => {
  try {

  const body = await req.json();

  const { nestDesc, postSlug} = body

  
  if(!params.userId) {
    return new NextResponse("User id is required", { status: 400 });
  }

  if(!nestDesc) {
    return new NextResponse("nestDesc is required", { status: 400 });
  }

  const user = await db.user.findFirst({
    where: {
      userId: params.userId
    }
  });


  // Handle the possibility that user?.email is undefined
  const userEmail = user?.email || "default@example.com";

  if(userEmail === "default@example.com") {
    return new NextResponse("userEmail can not be null", { status: 400 });
  }

  // const comments = await db.comment.findFirst({
  //   where: {
  //     ...(postSlug && { postSlug }), // Only include the condition if postSlug is provided.
  //   }
  // });

  // const commentsId = comments?.id || null;

  // if(commentsId === null) {
  //   return new NextResponse("commentsId can not be null", { status: 400 });
  // }
  
  // const nestComment = await db.nestComment.create({
  //   data: {
  //     desc: nestDesc,
  //     userEmail,
  //     commentId: commentsId
  //   },
  //   include: {
  //     user: true,
  //     parentNest: true
  //   }
  // })

  // give it a try with id instead of postSlug
  // I have to pass from the comment.tsx
  const nestComment  = await db.comment.update({
    where: {
      ...(postSlug && { postSlug })
    },
    data: {
      NestComments: {
        create: {
          desc: nestDesc,
          userEmail,
        }
      }
    }
  })

  console.log("nestComment", nestComment)

    return NextResponse.json(nestComment);
  } catch (err) {
    console.log('[NESTCOMMENT_POST]', err)
    return new NextResponse("Internal Error", {status: 500})
  }
}