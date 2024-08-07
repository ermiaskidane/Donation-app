import {db} from "@/lib/db";

export interface BParams {
  slug: string,
  serverId?: string
}

export default async function getBlogbySlug(
  params: BParams,
) { 
  try {
    const { slug, serverId} = params;

    const post = await db.post.findUnique({
      where: { slug, serverId },
    });

    if (post) {
      const updatedPost = await db.post.update({
        where: { slug, serverId},
        data: { views: { increment: 1 } }
      });

      
      // for some reason the include method above runs to error
      // I had to find the user with is method
      const user = await db.user.findUnique({
        where: {email: post.userEmail}
      })


      return {updatedPost, user};
    } else {
      // Handle the case where the post with the given slug doesn't exist.
      // return new NextResponse("Post not found", { status: 404 });
      return "Post not Found"
      // throw new Error("Post not found")
    }
  } catch (error: any) {
    throw new Error(error);
  }
}