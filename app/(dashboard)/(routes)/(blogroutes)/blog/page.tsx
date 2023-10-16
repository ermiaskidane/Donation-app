import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import React from 'react'

const BlogPage = () => {
  return (
    <section className="w-full flex flex-col items-center px-20 pt-20 pb-10">
      <Blogcomponent blogRoute={false} />
    </section>
  )
}

export default BlogPage