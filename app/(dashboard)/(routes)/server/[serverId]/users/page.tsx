import { db } from '@/lib/db';
import React from 'react'
import { UsersClient } from './components/clients';
import { format } from 'date-fns';
import { Metadata } from 'next';
import { AuthMembers } from '@/lib/authMembers';

export const metadata: Metadata = {
  title: "User",
};

const UsersPage = async({
  params
}: {
  params: { serverId: string }
}) => {

  const {UserRole, currentuser} =  await AuthMembers(params.serverId)
  
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

  const formattedUsers = users.map((user) => {
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

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} userRole={UserRole} server={currentuser.server!} serverId={params.serverId} />
      </div>
    </div>
  )
}

export default UsersPage