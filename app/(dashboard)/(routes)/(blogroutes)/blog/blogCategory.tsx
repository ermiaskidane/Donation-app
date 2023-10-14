"use client"

import CardList from '@/components/blogcomponents/cardList'
import { useSearchParams } from 'next/navigation'
import React from 'react'

function BlogCategory() {
  const searchParams = useSearchParams()
  const cat: string | null = searchParams.get("cat")

  // searchParams.page is string has to be number and 
  // parseInt doesnot expect a null value for that we use terinary operator
  const page = parseInt(searchParams.get("page") ?? "", 10) || 1

  // console.log("@@@@@@@@@@@@@@@", page)
  // console.log("~~~~~~~~~~~~~~~~", cat)
  return (
    <div className='flex flex-col gap-8'>
      <h2 className='text-center text-2xl text-black capitalize font-semibold'>{cat}</h2>
      <CardList page={page} cat={cat}/>
    </div>
  )
}

export default BlogCategory