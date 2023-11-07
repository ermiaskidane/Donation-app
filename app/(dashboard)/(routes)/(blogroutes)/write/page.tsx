import WriteBlog from '@/components/blogcomponents/writeBlog'
import { db } from '@/lib/db'
import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const WritePage = async() =>{

  const user = await initialUser()

  if (!user) {
    return redirectToSignIn();
  } 

  if(user.role === "GUEST" || user.role === "MEMBER" ){
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