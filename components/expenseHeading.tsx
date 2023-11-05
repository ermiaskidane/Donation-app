"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button"
import { PoundSterling } from "lucide-react"

interface ExpenseHeadingProps {
  openAmount: () => void;
}


export const ExpenseHeading:React.FC<ExpenseHeadingProps> = ({openAmount}: ExpenseHeadingProps) => {
  return (
  
    <div className="flex items-center justify-between">
        <h2 className="py-4 text-center text-xl font-bold sm:text-2xl">Yearly Expenses</h2>
        <div className="flex flex-col gap-2 md:flex-row">
          <Button onClick={openAmount} >
            <PoundSterling className="mr-2 h-4 w-4" /> Current Amount
          </Button>
        </div>
      </div>
  )
}