import React from 'react'
import { currentUser } from "@clerk/nextjs/server";
import {DonationForm} from './components/donation-form'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const AddDonation = async ({
  params
}: {
  params: { memberId?: string }
}) => {

  const user = await currentUser();

  const userRole = await db.user.findUnique({
    where: {
      userId: user?.id,
    }
  });

  if(userRole?.role !== "ADMIN"){
    redirect("/members");
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