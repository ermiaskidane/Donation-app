import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import SingleBlog from '@/components/blogcomponents/singleBlog'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const SinglePage = async ({
  params
}: {params: {slug: string}}) => {
  
  // const [data, setData] = useState<any>({ posts: [], count: 0 });


  const { slug } = params
  return (
    <>
    <SingleBlog slug={slug}/>
    </>
  )
}

export default SinglePage