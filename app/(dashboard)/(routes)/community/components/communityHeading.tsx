"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { User as userRole} from "@prisma/client";
import { CurrentAmountModal } from '@/components/Modal/currentAmount-modal';
import { CalenderModal } from '@/components/Modal/calender-modal';
import { ExpenseModal } from '@/components/Modal/server-modal';

export const CommunityHeading = () => {
  const [poundOpen, setPoundOpen] = useState<boolean>(false);
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);
  const [year, setYear] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitYear = async (data: any) => {
    console.log("dfsf", data)
  }

  return (
    <>
      <ExpenseModal
        isOpen={calenderOpen} 
        onClose={() => setCalenderOpen(false)}
        onSubmit={onSubmitYear}
        loading={loading}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="py-4 text-center text-2xl font-bold sm:text-2xl">Communitys</h2>
          <div className="flex gap-2 mt-1 mb-4 sm:my-0">
            {/* {userRole.role === "ADMIN" && ( */}
              <Button onClick={() => setCalenderOpen(true)} className="w-32 sm:w-full" >
                {/* <Calendar className="mr-2 h-4 w-4" /> Add Year */}
                Add Community
              </Button>
            {/* )} */}
          </div>
      </div>
    </>
  )
}
