import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import { UsersClient } from './components/clients';
import { UsersColumn } from './components/columns';
import { format } from 'date-fns';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';

const UsersPage = async() => {
  const currentuser = await currentProfile()

  if (!currentuser) {
    return auth().redirectToSignIn();
  } 

  if(currentuser.role !== "ADMIN"){
    redirect("/")
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedUsers: UsersColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
      <UsersClient data={formattedUsers}/>
      </div>
    </div>
  )
}

export default UsersPage