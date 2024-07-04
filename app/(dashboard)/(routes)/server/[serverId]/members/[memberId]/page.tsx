import React from 'react'
import {MemberForm} from './components/member-form'
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import { Position } from '@prisma/client';
import { redirect } from 'next/navigation';

const MemberPage = async ({
  params
}: {
  params: {serverId: string, memberId?: string }
}) =>{

  // check user if admin else return to homepage
  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }

  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

  const member = await db.member.findUnique({
    where: {
      id: params.memberId,
    },
    include: {
      donations: true,
    }
  });

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MemberForm initialData={member} />
      </div>
    </div>
  )
}

export default MemberPage