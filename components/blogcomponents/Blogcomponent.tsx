"use client"

import { Category, Post } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CardList from './cardList'
import { BlogData } from '@/type'
import Loading from '@/app/loading'

// make optional for the blog page as not neccessary to display the category
interface BlogcomponentProps {
  categories?: Category[]
  blogRoute: boolean,
  Blogs: BlogData,
}

interface CatagoryStyles {
  cloth: string
  bible: string,
  saints: string,
  monastery: string,
  cross: string,
}


const CatagoryStyles: CatagoryStyles = {
  cloth: "#ffb04f45",
  bible: "#da85c731",
  saints: "#7fb88133",
  monastery: "#ff795736",
  cross: "#ffb04f45",
}

const Blogcomponent = ({
  categories,
  blogRoute,
  Blogs
}: BlogcomponentProps) => {

  const searchParams = useSearchParams()

  // searchParams.page is string has to be number and 
  // parseInt doesnot expect a null value for that we use terinary operator
  const page = parseInt(searchParams.get("page") ?? "", 10) || 1
  const cat = searchParams.get("cat")
  // console.log("@@@@@@@@@@", categories)

  return (
    <>
    {Blogs.posts.length !== 0 ? (
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
             <Link 
                href={`/blog?cat=${cat.slug}`} 
                key={cat.id} 
                style={{
                  backgroundColor: `${CatagoryStyles[cat.slug  as keyof CatagoryStyles]}`
                }}
                className={`
                flex items-center 
                gap-4 capitalize 
                h-12 justify-center 
                rounded-xl
               
                w-full sm:h-14 sm:w-1/5 md:w-1/4 lg:w-1/6 `}
             >
               {cat.title}
             </Link>
          ))}
        </div>
      </div>
      {/* create the blog  */}
        <CardList data={Blogs} page={page} cat={cat}/>
      </div>
      ) : (
            <Loading/>
          )}
    </>
  )
}

export default Blogcomponent