import React from 'react'
import {MemberForm} from './components/member-form'
import { db } from '@/lib/db';

const MemberPage = async ({
  params
}: {
  params: { memberId?: string }
}) =>{

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