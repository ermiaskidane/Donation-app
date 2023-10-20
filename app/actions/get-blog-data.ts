import { NextResponse } from 'next/server';
import {db} from "@/lib/db";

export interface BlogDataParams {
  page: number;
  cat?: string;
}

// export default async function getBlogData (
//   params: BlogDataParams
// ) {
//   try {
//     const { page, cat} = params
//     let query: any = {}

//   } catch(error: any) {
//     throw new Error(error)
//   }
// }

export const getBlogData = async (page: number, cat: string) => {

  const pageValue = page ? page : 1;

  console.log("£££££££££££££", pageValue)
  console.log("£££££££££££££", cat)
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
  try {
        // transaction makes multiple query at once
        const [posts, count] = await db.$transaction([
          db.post.findMany(query),
          db.post.count({ where: query.where }),
        ])
    
        // console.log(
        //   '$$$$$$$$$$$$$$$$$$$$$',
        //   posts,
        //   '!!!!!!!!!!!!!!!!!!!!!!!!',
        //   count
        // )
        // return new NextResponse(JSON.stringify( "hello"))
        return { posts, count }
      } catch (error: any) {
        throw new Error(error);
      }
  // const stockCount = await db.post.count({
  //   where: {
  //     storeId,
  //     isArchived: false,
  //   }
  // });
};

// export const GET = async (req: Request) => {
//   const {searchParams} = new URL(req.url)

//   // console.log("hhhhhhhhhhhhhhhhhhhhhh", req.url)

//   const page = searchParams.get('page')
//   const cat = searchParams.get('cat')

//   // Provide a default value for page if it's null
//   const pageValue = page ? parseInt(page, 10) : 1;

//   // console.log("lllllllllllllllllllll", pageValue)

//   const POST_PER_PAGE = 3

//   const query = {
//     take: POST_PER_PAGE,
//     skip: POST_PER_PAGE * (pageValue - 1),
//     where: {
//       ...(cat && {catSlug: cat})
//     },
//     orderBy: {
//       createdAt: "desc", // Sort by creation timestamp in descending order
//     }
//   }
//   try {
//     // transaction makes multiple query at once
//     const [posts, count] = await db.$transaction([
//       db.post.findMany(query),
//       db.post.count({ where: query.where }),
//     ])

//     // console.log(
//     //   '$$$$$$$$$$$$$$$$$$$$$',
//     //   posts,
//     //   '!!!!!!!!!!!!!!!!!!!!!!!!',
//     //   count
//     // )
//     // return new NextResponse(JSON.stringify( "hello"))
//     return new NextResponse(JSON.stringify({ posts, count }))
//   } catch (err) {
//     console.log(err)
//     return new NextResponse(
//       JSON.stringify({ message: 'Something went wrong!' })
//     )
//   }
// }