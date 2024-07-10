import React from 'react'
import {DonationForm} from './components/donation-form'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { AuthMembers } from '@/lib/authMembers';

const AddDonation = async ({
  params
}: {
  params: {serverId: string, memberId?: string }
}) => {

  const {UserRole} =  await AuthMembers(params.serverId)

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