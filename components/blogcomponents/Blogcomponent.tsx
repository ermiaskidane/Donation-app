"use client"

import { Category } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import CardList from './cardList'
import Pagination from './Pagination'

// make optional for the blog page as not neccessary to display the category
interface BlogcomponentProps {
  categories?: Category[]
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

const Blogcomponent = ({
  categories
}: BlogcomponentProps) => {
  const searchParams = useSearchParams()

  // searchParams.page is string has to be number and 
  // parseInt doesnot expect a null value for that we use terinary operator
  const page = parseInt(searchParams.get("page") ?? "", 10) || 1
 
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Latest Articles</h2>
        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          a weekly article about Eritrean Monastery
        </p>
      </div> 
      {/* ################################# */}

      <div className='my-8'>
        {/* <h1 className="text-2xl font-semibold my-12 mx-0">Catagories</h1> */}

        <div className="flex flex-wrap justify-between gap-4">
          {categories?.map((cat) => (
             <Link href={`/blog?cat=${cat.slug}`} className={`
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


      {/* ################################# */}
      {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div className="relative overflow-hidden rounded-xl">
            <img src="/images/Screenshot (247).png"
            alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
          </div>
          <div className="mt-6 relative">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              De fuga fugiat lorem ispum laboriosam expedita.
            </h3>
            <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <Link className="inline-block" href="/blog">
              <span className="text-info dark:text-blue-300">Read more</span>
            </Link>
          </div>
          
        </div>
        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div className="relative overflow-hidden rounded-xl">
            <img src="/images/Screenshot (248).png"
            alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
          </div>
          <div className="mt-6 relative">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              De fuga fugiat lorem ispum laboriosam expedita.
            </h3>
            <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <Link className="inline-block" href="/blog">
              <span className="text-info dark:text-blue-300">Read more</span>
            </Link>
          </div>
          
        </div>
        <div className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div className="relative overflow-hidden rounded-xl">
            <img src="/images/Screenshot (249).png"
            alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
          </div>
          <div className="mt-6 relative">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              De fuga fugiat lorem ispum laboriosam expedita.
            </h3>
            <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300">
              Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
            </p>
            <Link className="inline-block" href="/blog">
              <span className="text-info dark:text-blue-300">Read more</span>
            </Link>
          </div>
          
        </div>
      </div> */}
      {/* create the blog  */}
      <CardList page={page}/>
  </div>
  )
}

export default Blogcomponent