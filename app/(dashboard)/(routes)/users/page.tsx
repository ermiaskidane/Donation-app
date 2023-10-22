import { db } from '@/lib/db';
import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { UsersClient } from './components/clients';

const UsersPage = async() => {

  const user = await initialUser()

  if (!user) {
    return redirectToSignIn();
  } 

  if(user.role !== "ADMIN"){
    redirect("/")
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  // console.log("??????????????", users)
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
      <UsersClient data={users}/>
      </div>
    </div>
  )
}

export default UsersPage