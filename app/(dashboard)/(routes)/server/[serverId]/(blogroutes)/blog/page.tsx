import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import { ServerToggle } from '@/components/serverToggle';
import { AuthMembers } from '@/lib/authMembers';
import { Metadata } from 'next';
import React from 'react'

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams,
  params: {serverId: string}
}

export const metadata: Metadata = {
  title: "Blog",
};
 
const BlogPage = async({searchParams, params}: BlogPageProps) => {

  const blogList = await getBlog(searchParams, params)

  const {UserRole, currentuser} =  await AuthMembers(params.serverId)
  
  return (
    <section className=" flex flex-col mx-8">
      <div className=" flex justify-end px-0 pb-2">
        <ServerToggle server={currentuser.server} serverId={params.serverId} userRole={UserRole}/>
      </div>
      <Blogcomponent Blogs={blogList} blogRoute={false}  serverId={params.serverId}/>
    </section>
  )
}

export default BlogPage