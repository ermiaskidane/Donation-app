import { db } from '@/lib/db';
import ChartClient from './chartClient';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import { Position } from '@prisma/client';
import { redirect } from 'next/navigation';

const Chartview = async ({
  params
}: {
  params: {serverId: string, memberId?: string }
}) => {

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
      donations: true
    }
  });

  const totalAmount = member?.donations.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount
  }, 0)

  return (
      <div className="mx-auto w-11/12  md:w-9/12">
        <h2 className="text-2xl font-semibold text-center py-10">Detail donation by <span className='text-[#8884d8]'>{member?.name}</span></h2>
        <ChartClient data={member?.donations}/>

        <div className="mt-10">
          <h2 className="text-center text-lg font-medium">Total amount: <span className='text-[#8884d8]'>£{totalAmount}</span></h2>
        </div>
      </div>
  )
}

export default Chartview
