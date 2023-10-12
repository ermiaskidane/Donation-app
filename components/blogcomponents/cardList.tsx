"use client"

import React, { useEffect, useState } from 'react'
import Card from './card'

interface cardListprops {
  page: number,
  cat?: string
}

const getData = async (page: number, cat: string | undefined) => {
  const res = await fetch(
    `http://localhost:3001/api/blog?page=${page}&cat=${cat || ''}`,
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
  // const { posts, count } = await getData(page, cat)
  const [data, setData] = useState<any>({ posts: [], count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(page, cat);
        setData(result);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, [page, cat]);

  console.log("@@@@@@@@@@@@@@@@LLLLLLLLLLLLLLLLL", data)
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.posts.map((blog: any) => (
          <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
            <Card blog={blog} key={blog._id}/>
          </div>
        ))}
    </div>
  )
}

export default CardList