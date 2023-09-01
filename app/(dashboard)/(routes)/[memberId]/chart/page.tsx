"use client";

import { useParams } from "next/navigation";
import { data } from "@/lib/data"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// const data2 = [
//   { name: 'Jan', total: 25.50 },
//   { name: 'Feb', total: 0 },
//   { name: 'Mar', total: 75.25 },
//   { name: 'Apr', total: 10.00 },
//   { name: 'May', total: 0 },
//   { name: 'Jun', total: 50.75 },
//   { name: 'Jul', total: 0 },
//   { name: 'Aug', total: 30.20 },
//   { name: 'Sep', total: 0 },
//   { name: 'Oct', total: 15.80 },
//   { name: 'Nov', total: 0 },
//   { name: 'Dec', total: 90.60 }
// ]

// console.log("data2", data2)

// interface ChartviewProps {
//   data: any[]
// }

const Chartview = () => {

  const params = useParams();

  const userMember = data.find((el) => el.id == params.memberId)


  // console.log("userMember", userMember?.donation);
  return (
      <div className="mx-auto w-9/12">
        <h2 className="text-2xl font-semibold text-center py-10">Detail donation by {userMember?.name}</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart  data={userMember?.donation}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="dt" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-10">
          <h2 className="text-center text-lg">Total amount: £100</h2>
        </div>
      </div>
  )
}

export default Chartview