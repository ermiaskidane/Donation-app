"use client"

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DataTable } from "@/components/ui/data-table";
import {  ExpenseColumn, columns } from "./columns";
import { Button } from '@/components/ui/button';
import { ExpenseModal } from '@/components/Modal/expense-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { CurrentAmountModal } from '@/components/Modal/currentAmount-modal';
import { ExpenseHeading } from '@/components/expenseHeading';
import useUserRoleStore from '@/hooks/useUserRole';
import { Donation, Expense, Member, MemberRole, Year, User as userRole } from '@prisma/client';
import { ServerToggle } from '@/components/serverToggle';
import { CalenderModal } from '@/components/Modal/calender-modal';

interface ExpenseClientProps {
  yearlyExpense: ExpenseColumn[]
  // OR
  // invoices: (Year & {expenses: Expense})[],
  donation: (Member & {donations: Donation[]})[],
  userRole: MemberRole | undefined;
}

interface AddExpense {
  paymentStatus: string;
  description: string;
  amount: number;
}

// the steps I follow here are

// 1.Preprocess the data to group expenses by year.
// 2.Calculate the total expense for each year.
// 3.Pass the preprocessed data to your component for rendering.

const parseYear = (dtime: string) => {
  const match = dtime.match(/\b\d{4}\b/); // Matches a four-digit number (year)
  return match ? parseInt(match[0], 10) : NaN;
};

// Function to group donations by year
const groupDonationsByYear = (data: (Member & {donations: Donation[]})[],) => {
  const yearlyDonations: Record<number, { year: number; donated: Donation[]; total: number }>  = {};

  data.forEach(member => {
    member.donations.forEach(donation => {
      const year = parseYear(donation.dtime);

      if (!yearlyDonations[year]) {
        yearlyDonations[year] = {
          year: year,
          donated: [],
          total: 0
        };
      }

      yearlyDonations[year].donated.push(donation);
      yearlyDonations[year].total += donation.amount;
    });
  });

  // Convert the yearlyDonations object to an array
  return Object.values(yearlyDonations).sort((a, b) => a.year - b.year);
};


export const YearlyExpenseSum = (spent: Expense[]) => {
  const arrsum = spent.reduce((acc, total) => {
    return acc + total.amount
  }, 0)

  return arrsum
}

export const ExpenseClient: React.FC<ExpenseClientProps> = ({
  yearlyExpense,
  donation,
  userRole
}) => {

  const router = useRouter()
  const params = useParams();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [poundOpen, setPoundOpen] = useState<boolean>(false);
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);
  const [yearId, setYearId] = useState<string>();

  const groupedDonations = groupDonationsByYear(donation);
  
  const { roleUser, setRoleUser} = useUserRoleStore()

  // change the defualt Zustand Guest to the actual current userrole
  useEffect(() => {
      setRoleUser(userRole);
  }, [userRole, setRoleUser]);

  const TotalSum = (exp: ExpenseColumn) => {
    // Find the yearly expenses object for the current year
    const yearlyDonate = groupedDonations.find((item) => Number(item.year) === exp.year);

    if (yearlyDonate) {
      const total = yearlyDonate.total - YearlyExpenseSum(exp.expenses);
      return total;
    }
  
    return 0; // Handle the case when there's no matching yearly expense data
  };

  const OpenModal = (exp: ExpenseColumn) => {
    if (exp) {
      setOpen(true);
      setYearId(exp.id);
    }
  }

  const onSubmit = async (data: AddExpense) => {
    try {
      setLoading(true)
      await axios.post(`/api/${params.serverId}/expense/${yearId}`, data)

      router.refresh();
      router.push(`/server/${params.serverId}/expenses`);
      toast.success("expense has been created")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
      setOpen(!open);
    }
  }
  const onSubmitYear = async (data: {year: number}) => {
    try {
      setLoading(true)
      await axios.post(`/api/${params.serverId}/expense`, data)

      router.refresh();
      router.push(`/server/${params.serverId}/expenses`);
      toast.success("expense year has been created")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
      setCalenderOpen(!calenderOpen);
    }
  }
 
  return (
    <>
    <ExpenseModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />
      <CurrentAmountModal
        isOpen={poundOpen} 
        onClose={() => setPoundOpen(false)}
        donation={donation}
        YearlyExpense={yearlyExpense}
        loading={loading}
      />
      <CalenderModal
        isOpen={calenderOpen} 
        onClose={() => setCalenderOpen(false)}
        onSubmit={onSubmitYear}
        loading={loading}
      />
      <div className=" flex justify-end px-0">
        {/*@ts-ignore*/}
        <ServerToggle serverId={params.serverId} userRole={userRole}/>
      </div>
      <ExpenseHeading openAmount={() => setPoundOpen(true)} openCalender={() => setCalenderOpen(true)} userRole={userRole}/>
      <Accordion type="single" collapsible className="w-full">
        {yearlyExpense.map((exp, i) => (
          <AccordionItem value={exp.id} key={exp.id}>
            <AccordionTrigger>{exp.year}</AccordionTrigger>
              <AccordionContent>
                {userRole === "ADMIN" && (
                  <div className='flex justify-end'>
                    <Button onClick={() => OpenModal(exp)}>Add Expense</Button>
                  </div>
                )}
              <DataTable hideContent={true} searchKey="name" columns={columns} data={exp.expenses}/>
              <AccordionContent className=' text-black text-center pt-5'>Total Expense in {exp.year}: £{YearlyExpenseSum(exp.expenses)} </AccordionContent>
                <AccordionContent className='font-semibold text-black text-center'>Total Amount in {exp.year}: £{TotalSum(exp)}</AccordionContent>
              </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}



