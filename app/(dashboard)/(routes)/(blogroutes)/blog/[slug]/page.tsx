import getBlogbySlug, {BParams} from '@/app/actions/getBlogBySlug'
import getBlogs, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import SingleBlog from '@/components/blogcomponents/singleBlog'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface SinglePageProps {
  searchParams: IParams
}

const SinglePage = async ({
  params,
  searchParams
}: SinglePageProps & {params: {slug: string}}) => {

  const blogList = await getBlogs(searchParams)
  const getBlog = await getBlogbySlug(params)

  // console.log("BBBBBBBBBBBBBb", getBlog)
  return (
    <>
    <SingleBlog blogs={blogList} blog={getBlog} slug={params.slug}/>
    </>
  )
}

export default SinglePage