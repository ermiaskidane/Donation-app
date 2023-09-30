import { db } from '@/lib/db';
import ChartClient from './chartClient';

const Chartview = async ({
  params
}: {
  params: { memberId?: string }
}) => {

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
      <div className="mx-auto w-9/12">
        <h2 className="text-2xl font-semibold text-center py-10">Detail donation by {member?.name}</h2>
        <ChartClient data={member?.donations}/>

        <div className="mt-10">
          <h2 className="text-center text-lg">Total amount: £{totalAmount}</h2>
        </div>
      </div>
  )
}

export default Chartview
