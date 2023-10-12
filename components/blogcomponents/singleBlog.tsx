"use client"

import { Post } from '@prisma/client'
import React, { useEffect, useState } from 'react'

interface SingleBlogprops {
  slug: string
}

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3001/api/blog/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const SingleBlog = ({
  slug
}: SingleBlogprops) => {

  const [data, setData] = useState<any>({ updatedPost: {}, user: {} });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  
  console.log("£££££££££££££££££££££33", data)

  // console.log("£££££££££££££££££££££33", slug)
  // const data = await getData(slug)
  // console.log("£££££££££££££££££££££33", data)
  return (
    <div>singleBlog</div>
  )
}

export default SingleBlog