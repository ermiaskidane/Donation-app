import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import {db} from '@/lib/db';

export const GET = async (req: Request) => {
  const {searchParams} = new URL(req.url)

  const page = searchParams.get('page')
  const cat = searchParams.get('cat')

  console.log("lllllllllllllllllllll", page)

  try {
    // transaction makes multiple query at once
    // const [posts, count] = await pridbsma.$transaction([
    //   db.post.findMany(query),
    //   db.post.count({ where: query.where }),
    // ])

    // console.log(
    //   '$$$$$$$$$$$$$$$$$$$$$',
    //   posts,
    //   '!!!!!!!!!!!!!!!!!!!!!!!!',
    //   count
    // )
    return new NextResponse(JSON.stringify( "hello"))
  } catch (err) {
    console.log(err)
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' })
    )
  }
}

// CREATE A POST
export async function POST (
  req: Request
)  {
  try {
    
  const { userId } = auth();

  // console.log("mmmmmmmmmmmmmmmmmmm", auth())

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

  const UserAdmin = await db.user.findFirst({
    where: {
      userId,
    },
    include: {
      Post: true
    }
  })
  // console.log("kkkkkkkkkkkkk", UserAdmin)

  if (UserAdmin?.role !== "ADMIN"){
    return new NextResponse("Unauthorized", { status: 405 });
  }

  const post = await db.post.create({
    data: {
      title, 
      desc,
      img, 
      slug, 
      catSlug,
      userEmail: UserAdmin.email
    }
  })

  return NextResponse.json(post);
  } catch(error) {
    console.log('[BLOG_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
