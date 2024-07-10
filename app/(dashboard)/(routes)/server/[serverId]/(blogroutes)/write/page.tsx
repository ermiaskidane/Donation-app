import WriteBlog from '@/components/blogcomponents/writeBlog'
import { ServerToggle } from '@/components/serverToggle'
import { AuthMembers } from '@/lib/authMembers'
import { db } from '@/lib/db'
import { Metadata } from 'next'
import React, { useState } from 'react'

export const metadata: Metadata = {
  title: "Write",
};

const WritePage = async({
  params
}: {
  params: { serverId: string }
}) =>{

  const {UserRole, currentuser} =  await AuthMembers(params.serverId)

  const categories = await db.category.findMany()
  return (
    <div className='mx-8'>
      <div className=" flex justify-end px-0 pb-2">
        <ServerToggle serverId={params.serverId} userRole={UserRole} server={currentuser.server}/>
      </div>
      <WriteBlog categories={categories} serverId={params.serverId}/>
    </div>
  )
}

export default WritePage