import getBlogbySlug, {BParams} from '@/app/actions/getBlogBySlug'
import getBlogs, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import SingleBlog from '@/components/blogcomponents/singleBlog'
import { User, Post } from '@prisma/client'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { cache, useState } from 'react'

interface SinglePageProps {
  searchParams: IParams
}

interface blog {
  post: Post,
  user: User
}
const getBlog = cache(async (params: {serverId: string, slug: string}) => {
  const blog = await getBlogbySlug(params)
  return blog;
})

export async function generateMetadata({
  params,
  searchParams
}: SinglePageProps & {params: {serverId: string, slug: string}}): Promise<Metadata>{
  // the type get conflicted as the action file renders different to our schema
  // so I just perfer to use ts-ignore cz the data is correct
  //@ts-ignore
  const blog: blog = await getBlog(params)

  return {
    //@ts-ignore
    title: blog.updatedPost.title,
    //@ts-ignore
    description: blog.updatedPost.title,
    openGraph: {
      images: [
        {
          //@ts-ignore
          url: blog.updatedPost.img
        }
      ]
    }
  }
}

const SinglePage = async ({
  params,
  searchParams
}: SinglePageProps & {params: {serverId: string, slug: string}}) => {

  const blogList = await getBlogs(searchParams, params)
  const blog = await getBlog(params)

  // console.log("BBBBBBBBBBBBBb", getBlog)
  return (
    <>
    <SingleBlog blogs={blogList} blog={blog} slug={params.slug}/>
    </>
  )
}

export default SinglePage