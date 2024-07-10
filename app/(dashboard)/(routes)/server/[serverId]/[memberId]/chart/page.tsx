import { db } from '@/lib/db';
import ChartClient from './chartClient';
import { AuthMembers } from '@/lib/authMembers';
import { ServerToggle } from '@/components/serverToggle';

const Chartview = async ({
  params
}: {
  params: {serverId: string, memberId?: string }
}) => {

  const {UserRole, currentuser} =  await AuthMembers(params.serverId)

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
    <>
      <div className=" flex justify-end pr-8">
        {/*@ts-ignore*/}
        <ServerToggle serverId={params.serverId} userRole={UserRole} server={currentuser.server}/>
      </div>

      <div className="mx-auto w-11/12  md:w-9/12">
        <h2 className="text-2xl font-semibold text-center py-10">Detail donation by <span className='text-[#8884d8]'>{member?.name}</span></h2>
        <ChartClient data={member?.donations}/>

        <div className="mt-10">
          <h2 className="text-center text-lg font-medium">Total amount: <span className='text-[#8884d8]'>£{totalAmount}</span></h2>
        </div>
      </div>
    </>
  )
}

export default Chartview
