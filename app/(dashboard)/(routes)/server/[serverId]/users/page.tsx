import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import { UsersClient } from './components/clients';
import { UsersColumn } from './components/columns';
import { format } from 'date-fns';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { Position } from '@prisma/client';

export const metadata: Metadata = {
  title: "User",
};

const UsersPage = async({
  params
}: {
  params: { serverId: string }
}) => {

  // Give access only for Admin Members
  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }
 
  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

  // 
  const position = await db.position.findMany({
    where:{
      serverId: params.serverId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  const UserId = position.map(pos => pos.userId)

  const users = await db.user.findMany({
    where:{
      id:{
        in: UserId
      }
    },
    include:{
      positions: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedUserss = users.map((user) => {
    // Filter positions by the specified serverId and extract roles
    const roles = user.positions
      .filter((position) => position.serverId === params.serverId)
      .map((position) => position.role);
  
    // Create a unique set of roles to avoid duplicates
    const uniqueRoles = Array.from(new Set(roles));
  
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: uniqueRoles.join(', '), // Combine roles into a single string
      updatedAt: format(user.updatedAt, "MMMM do, yyyy"),
    };
  });
  

  console.log("sfdsgdfg", formattedUserss)

  // const formattedUsers: UsersColumn[] = userss.map((item) => ({
  //   id: item.id,
  //   name: item.name,
  //   email: item.email,
  //   role: item.role,
  //   updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
  // }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
      <UsersClient data={formattedUserss} userRole={currentuser}/>
      </div>
    </div>
  )
}

export default UsersPage