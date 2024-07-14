"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Donation } from "@prisma/client"

interface ShadcnChartProps {
  data: Donation[] | undefined,
  totalAmount: number | undefined
  name: string | undefined
}

const chartConfig = {
  desktop: {
    label: "dtime",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const ShadcnChart:React.FC<ShadcnChartProps> = ({
  data,
  totalAmount,
  name
}) => {
  return (
    <Card className="border-0">
      <CardHeader className="text-center my-8">
        <CardTitle>Detail donation by <span className='text-chart-2'>{name}</span></CardTitle>
        <CardDescription>January 2017 - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dtime"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <YAxis /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-lg">
        <div className="flex gap-2 font-medium leading-none mt-10">
          <h1> Total Amount: <span className='text-chart-2'>£{totalAmount}</span></h1>
        </div>
      </CardFooter>
    </Card>
  )
}
