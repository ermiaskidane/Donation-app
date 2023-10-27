import {db} from "@/lib/db";

export interface IParams {
  cat?: string;
  page?: number
}

export default async function getBlogs(
  params: IParams
) { 
  try {
    const { cat, page} = params;

    // console.log("££££££££££££££££££££££", cat, page)

    // Provide a default value for page if it's null
  const pageValue = page ? page : 1;

    const POST_PER_PAGE = 3

    const query = {
      take: POST_PER_PAGE,
      skip: POST_PER_PAGE * (pageValue - 1),
      where: {
        ...(cat && {catSlug: cat})
      },
      orderBy: {
        createdAt: "desc", // Sort by creation timestamp in descending order
      }
    }

    // transaction makes multiple query at once
    const [posts, count] = await db.$transaction([
      // @ts-ignore
      db.post.findMany(query),
      db.post.count({ where: query.where }),
    ])
    
    // console.log("LLLLLLSSSSSSSSSSSSSSS", posts, count)
    return { posts, count } 
  } catch (error: any) {
    throw new Error(error);
  }
}
