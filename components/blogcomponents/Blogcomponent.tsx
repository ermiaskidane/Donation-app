"use client"

import { Category, Post } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CardList from './cardList'
import Pagination from './Pagination'
import toast from 'react-hot-toast'
import { BlogData } from '@/type'
import Loading from '@/app/loading'

// make optional for the blog page as not neccessary to display the category
interface BlogcomponentProps {
  categories?: Category[]
  cat?: string | null
  blogRoute: boolean
}

interface CatagoryStyles {
  cloth: string
  bible: string,
  saints: string,
  monastery: string,
  cross: string,
}


const CatagoryStyles: CatagoryStyles = {
  cloth: "bg-zinc-600",
  bible: "bg-red-300",
  saints: "bg-orange-300",
  monastery: "bg-lime-400",
  cross: "bg-green-300",
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

const Blogcomponent = ({
  categories,
  cat,
  blogRoute
}: BlogcomponentProps) => {
  const searchParams = useSearchParams()

  // searchParams.page is string has to be number and 
  // parseInt doesnot expect a null value for that we use terinary operator
  const page = parseInt(searchParams.get("page") ?? "", 10) || 1

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

  return (
    <>
    {data.posts.length !== 0 ? (
      <div className="max-w-7xl mx-auto px-2 md:px-4 xl:px-6">
        {blogRoute && (
          <div className="mb-12 space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Latest Articles</h2>
            <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
              a weekly article about Eritrean Monastery
            </p>
          </div> 
        )}
      {/* ################################# */}

      <div className='my-8'>
        <div className="flex flex-wrap justify-between gap-4">
          {categories?.map((cat) => (
             <Link href={`/blog?cat=${cat.slug}`} key={cat.id} className={`
             flex items-center 
             gap-4 capitalize 
            h-12 justify-center 
             rounded-xl 
             ${CatagoryStyles[cat.slug  as keyof CatagoryStyles]} w-full sm:h-14 sm:w-1/5 md:w-1/4 lg:w-1/6 `}>
               {cat.title}
             </Link>
          ))}
        </div>
      </div>
      {/* create the blog  */}
      <CardList data={data} page={page}/>
  </div>
    ) : (
      <Loading/>
    )}
    </>
  )
}

export default Blogcomponent