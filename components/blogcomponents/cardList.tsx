"use client"

import React, { useEffect, useState } from 'react'
import Card from './card'
import Pagination from './Pagination'
import toast from 'react-hot-toast';
import { Post } from '@prisma/client';
import { BlogData } from '@/type';

interface cardListprops {
  page: number,
  data: BlogData,
  cat?:string
}

const CardList = ({
  data,
  page,
  cat
}: cardListprops) => {

  const POST_PER_PAGE = 3

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count

  return (
    <>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data?.posts.map((blog) => (
        <div key={blog.id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <Card blog={blog}/>
        </div>
      ))}
    </div>
    <Pagination cat={cat} page={page} hasPrev={hasPrev} hasNext={hasNext}/>
 </>
  )
}

export default CardList