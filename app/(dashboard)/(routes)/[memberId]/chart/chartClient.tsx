"use client"

import { Donation } from "@prisma/client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ChartClientProps {
  data: Donation[] | undefined,
}

const ChartClient: React.FC<ChartClientProps> = ({
  data
}) => {
  console.log("DATA", data?.length)
  console.log("DATA", data)
  return (
    <div className="w-screen md:w-full">
        <ResponsiveContainer width="100%" height={350}>
           <BarChart 
              width={150} 
              height={40} 
              data={data} 
              // margin={{
              //     top: 5,
              //     right: 90,
              //     left: 90,
              //     bottom: 5,
              //   }}
           >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dtime" />
             <YAxis />
             <Tooltip />
             {/* <Legend /> */}
            <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
         </ResponsiveContainer>
    </div>
  )
}

export default ChartClient