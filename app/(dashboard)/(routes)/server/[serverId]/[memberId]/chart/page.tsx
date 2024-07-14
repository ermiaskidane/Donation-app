import { db } from '@/lib/db';
import ChartClient from './chartClient';
import { AuthMembers } from '@/lib/authMembers';
import { ServerToggle } from '@/components/serverToggle';
import { ShadcnChart } from './shadcnChart';

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

  console.log("fgdfhgf", typeof totalAmount)
  return (
    <>
      <div className=" flex justify-end pr-8">
        {/*@ts-ignore*/}
        <ServerToggle serverId={params.serverId} userRole={UserRole} server={currentuser.server}/>
      </div>

      <div className="mx-auto w-11/12  md:w-9/12">
        {/* <h2 className="text-2xl font-semibold text-center py-10">Detail donation by <span className='text-[#8884d8]'>{member?.name}</span></h2> */}
        {/* <ChartClient data={member?.donations}/> */}
        <ShadcnChart data={member?.donations} totalAmount={totalAmount} name={member?.name}/>
      </div>
    </>
  )
}

export default Chartview
