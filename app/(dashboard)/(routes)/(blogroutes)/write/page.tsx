import WriteBlog from '@/components/blogcomponents/writeBlog'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const WritePage = async() =>{

  const currentuser = await currentProfile()

  if (!currentuser) {
    return redirectToSignIn();
  } 

  if(currentuser.role === "GUEST" || currentuser.role === "MEMBER" ){
    redirect("/");
  }

  const categories = await db.category.findMany()
  return (
    <div className='m-4'>
      <WriteBlog categories={categories}/>
    </div>
  )
}

export default WritePage