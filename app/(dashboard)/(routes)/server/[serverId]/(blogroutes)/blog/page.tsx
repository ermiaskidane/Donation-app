import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import { ServerToggle } from '@/components/serverToggle';
import { currentProfile } from '@/lib/current-profile';
import { RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Position } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
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

  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }
 
  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

  // const currentuser = await currentProfile()
  
  // if (!currentuser) {
  //   return <RedirectToSignIn/>;
  // }
  
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