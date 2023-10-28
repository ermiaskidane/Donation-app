import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import React from 'react'

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams
}
 
const BlogPage = async({searchParams}: BlogPageProps) => {

  const blogList = await getBlog(searchParams)
  
  return (
    <section className=" flex flex-col">
      <Blogcomponent Blogs={blogList} blogRoute={false} />
    </section>
  )
}

export default BlogPage