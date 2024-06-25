import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import { Metadata } from 'next';
import React from 'react'

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams
}

export const metadata: Metadata = {
  title: "Blog",
};
 
const BlogPage = async({searchParams}: BlogPageProps) => {

  const blogList = await getBlog(searchParams)
  
  return (
    <section className=" flex flex-col">
      <Blogcomponent Blogs={blogList} blogRoute={false} />
    </section>
  )
}

export default BlogPage