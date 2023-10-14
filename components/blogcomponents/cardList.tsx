"use client"

import React, { useEffect, useState } from 'react'
import Card from './card'
import Pagination from './Pagination'
import toast from 'react-hot-toast';

// Define a type for the 'posts' array elements
interface Post {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string | null; // Adjust the type of 'img' as needed
  views: number;
  catSlug: string;
  userEmail: string;
  createdAt: string; // You might want to use Date type here
}

// Define a type for the data you expect to receive
interface BlogData {
  posts: Post[];
  count: number;
}
interface cardListprops {
  page: number,
  cat?: string | null
}

const getData = async (page: number, cat: string | null | undefined): Promise<BlogData>  => {
  const res = await fetch(
    `http://localhost:3000/api/blog?page=${page}&cat=${cat || ''}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const CardList = ({
  page, cat
}: cardListprops) => {
  const [data, setData] = useState<BlogData>({ posts: [], count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(page, cat);
        setData(result);
      } catch (error) {
        // Handle errors
        toast.error("something went wrong");
      }
    };

    fetchData();
  }, [page, cat]);

  const POST_PER_PAGE = 3

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count

  // console.log("@@@@@@@@@@@@@@@@LLLLLLLLLLLLLLLLL", data.posts)
  if (data.posts.length == 0) {
    return (
      <div className="m-4">
          <p className='text-3xl text-center text-rose-400'>No {cat} Category Found</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.posts.map((blog) => (
          <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
            <Card blog={blog} key={blog.id}/>
          </div>
        ))}
    </div>
    

    <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </>
  )
}

export default CardList