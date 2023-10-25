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
    <section className="w-full flex flex-col items-center px-20 pt-20 pb-10">
      <Blogcomponent Blogs={blogList} blogRoute={false} />
    </section>
  )
}

export default BlogPage