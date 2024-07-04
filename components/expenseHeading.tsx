"use client"

import { MemberRole, User as userRole} from "@prisma/client";
import { Button } from "./ui/button"
import { Calendar, PoundSterling } from "lucide-react"

interface ExpenseHeadingProps {
  openAmount: () => void;
  openCalender: () => void;
  userRole: MemberRole | undefined
}
 
 
export const ExpenseHeading:React.FC<ExpenseHeadingProps> = ({openAmount, openCalender, userRole}: ExpenseHeadingProps) => {
  return (
  
    <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="py-4 text-center text-2xl font-bold sm:text-2xl">Yearly Expenses</h2>
        <div className="flex gap-2 mt-1 mb-4 sm:my-0">
          {userRole === "ADMIN" && (
            <Button onClick={openCalender} className="w-32 sm:w-full" >
              <Calendar className="mr-2 h-4 w-4" /> Add Year
            </Button>
          )}
          <Button onClick={openAmount} className="w-32 sm:w-full" >
            <PoundSterling className="mr-2 h-4 w-4" /> Current Amount
          </Button>
        </div>
      </div>
  )
}