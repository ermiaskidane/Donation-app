import WriteBlog from '@/components/blogcomponents/writeBlog'
import { ServerToggle } from '@/components/serverToggle'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
// import { initialUser } from '@/lib/initial-user'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

export const metadata: Metadata = {
  title: "Write",
};

const WritePage = async({
  params
}: {
  params: { serverId: string }
}) =>{

  const currentuser = await currentProfile()

  if (!currentuser) {
    return auth().redirectToSignIn();
  } 

  if(currentuser.role === "GUEST" || currentuser.role === "MEMBER" ){
    redirect("/");
  }

  const categories = await db.category.findMany()
  return (
    <div className='mx-8'>
      <div className=" flex justify-end px-0 pb-2">
        <ServerToggle serverId={params.serverId} userRole={currentuser}/>
      </div>
      <WriteBlog categories={categories} serverId={params.serverId}/>
    </div>
  )
}

export default WritePage