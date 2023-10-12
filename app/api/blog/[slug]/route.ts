import {db} from '@/lib/db'
import { NextResponse } from 'next/server'


// GET SINGLE POST
export const GET = async (req: Request, 
  { params } : {params : {slug: string}}) => {
  const { slug } = params

  console.log("888888888888888888888", slug)

  try {

    const post = await db.post.findUnique({
      where: { slug },
      // include: { user: true },
    });

    console.log("888888888888888888888", post)

    if (post) {
      const updatedPost = await db.post.update({
        where: { slug },
        data: { views: { increment: 1 } }
        // include: { user: true },
      });

      
      // for some reason the include method above runs to error
      // I had to find the user with is method
      const user = await db.user.findUnique({
        where: {email: post.userEmail}
      })

      console.log('99999999999999999999999999', updatedPost);

      return new NextResponse(JSON.stringify({updatedPost, user}));
    } else {
      // Handle the case where the post with the given slug doesn't exist.
      return new NextResponse("Post not found", { status: 404 });
    }
  } catch (err) {
    console.log('[BLOG_GET]', err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
