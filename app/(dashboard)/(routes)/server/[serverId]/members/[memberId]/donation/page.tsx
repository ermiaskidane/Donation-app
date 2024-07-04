import React from 'react'
import { auth, currentUser } from "@clerk/nextjs/server";
import {DonationForm} from './components/donation-form'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/current-profile';
import { Position } from '@prisma/client';

const AddDonation = async ({
  params
}: {
  params: {serverId: string, memberId?: string }
}) => {

  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }

  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST"){
    redirect("/");
  }

  if(UserRole !== "ADMIN"){
    redirect(`/server/${params.serverId}/members`);
  }
  
  const member = await db.member.findUnique({
    where: {
      id: params.memberId 
    },
    include: {
      donations: true
    }
  });

  const donation = await db.donation.findFirst({
    where: {
      memberId: params.memberId,
    }
  });

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DonationForm initialData={donation} updateDonation={member?.donations } />
      </div>
    </div>
  )
}

export default AddDonation