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

  // console.log("£££££££££££££££3", totalAmount)

  // console.log("::::::::::::::::::::",params.memberId)
  // console.log("::::::::::::::::::::",member)

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


// import { useParams } from "next/navigation";
// import { data } from "@/lib/data"
// import { db } from '@/lib/db';
// import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


// const Chartview = async ({
//   params
// }: {
//   params: { memberId?: string }
// }) => {

//   // const donation = await db.member.findUnique({
//   //   where: {
//   //     id: params.memberId,
//   //   },
//   //   include: {
//   //     donations: true
//   //   }
//   // });

//   console.log("::::::::::::::::::::",params.memberId)
//   // console.log("::::::::::::::::::::",donation)

//   // const userMember = data.find((el) => el.id == params.memberId)


//   // console.log("userMember", userMember?.donation);
//   return (
//       <div className="mx-auto w-9/12">
//         <h2 className="text-2xl font-semibold text-center py-10">Detail donation by {userMember?.name}</h2>
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart  >
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="dt" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="amount" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>

//         <div className="mt-10">
//           <h2 className="text-center text-lg">Total amount: £100</h2>
//         </div>
//       </div>
//   )
// }

// export default Chartview