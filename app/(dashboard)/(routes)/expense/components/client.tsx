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
import { useRouter } from 'next/navigation';
import { CurrentAmountModal } from '@/components/Modal/currentAmount-modal';
import { ExpenseHeading } from '@/components/expenseHeading';
import useUserRoleStore from '@/hooks/useUserRole';
import { Donation, Expense, Year, User as userRole } from '@prisma/client';
import { CalenderModal } from '@/components/Modal/calender-modal';

interface ExpenseClientProps {
  invoices: ExpenseColumn[]
  // OR
  // invoices: (Year & {expenses: Expense})[],
  donation: Donation[],
  userRole: userRole
}

interface AddExpense {
  paymentStatus: string;
  description: string;
  amount: number;
}

// the steps we follow here are

// 1.Preprocess the data to group expenses by year.
// 2.Calculate the total expense for each year.
// 3.Pass the preprocessed data to your component for rendering.


// The groupExpensesByYear function groups expenses by year and calculates the total expenses for each year.
const groupDonatedByYear = (donation: Donation[]) => {

  const groupedDonation: { [year: string]: Donation[] } = {};

  donation.forEach((donates) => {
    const year = donates.dtime.trim().split(',')[1];
    if (groupedDonation[year]) {
      groupedDonation[year].push(donates);
    } else {
      groupedDonation[year] = [donates];
    }
  });

  const yearlyTotals = Object.keys(groupedDonation).map((year) => ({
    year,
    donated: groupedDonation[year],
    total: groupedDonation[year].reduce((acc, donate) => acc + donate.amount, 0),
  }));

  return yearlyTotals;
};


export const YearlyExpenseSum = (spent: Expense[]) => {
  const arrsum = spent.reduce((acc, total) => {
    return acc + total.amount
  }, 0)

  return arrsum
}

export const ExpenseClient: React.FC<ExpenseClientProps> = ({
  invoices,
  donation,
  userRole
}) => {

  const router = useRouter()
  
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [poundOpen, setPoundOpen] = useState<boolean>(false);
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);
  const [year, setYear] = useState<number | undefined>();

  const yearlyDonation = useState(() => groupDonatedByYear(donation))[0];

  // Sort yearlyDonation by the year in ascending order
  yearlyDonation.sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const { roleUser, setRoleUser} = useUserRoleStore()

  // change the defualt Zustand Guest to the actual current userrole
  useEffect(() => {
      setRoleUser(userRole.role);
  }, [userRole, setRoleUser]);

  const TotalSum = (exp: ExpenseColumn) => {
    // Find the yearly expenses object for the current year
    const yearlyDonate = yearlyDonation.find((item) => Number(item.year) === exp.year);
  
    // console.log("~~~~~~~~~~~~~", yearlyExpense)
    if (yearlyDonate) {
      const total = yearlyDonate.total - YearlyExpenseSum(exp.expenses);
      return total;
    }
  
    return 0; // Handle the case when there's no matching yearly expense data
  };

  const OpenModal = (exp: ExpenseColumn) => {
    if (exp) {
      setOpen(true);
      setYear(exp.year);
    }
  }

  const onSubmit = async (data: AddExpense) => {
    try {
      setLoading(true)
      await axios.post(`/api/expense/${year}`, data)

      router.refresh();
      router.push('/expense');
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
      await axios.post(`/api/expense`, data)

      router.refresh();
      router.push('/expense');
      toast.success("expense year has been created")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
      setCalenderOpen(!calenderOpen);
    }
  }
  // console.log(":?>>>>>>>>>><<<<<<<<< expense", invoices)
  // console.log(":?????????????? donated", yearlyDonation)
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
        YearlyExpense={invoices}
        loading={loading}
      />
      <CalenderModal
        isOpen={calenderOpen} 
        onClose={() => setCalenderOpen(false)}
        onSubmit={onSubmitYear}
        loading={loading}
      />
      {/* Add button inside the ExpenseHeading for the creation of year manually */}
      <ExpenseHeading openAmount={() => setPoundOpen(true)} openCalender={() => setCalenderOpen(true)}/>
      <Accordion type="single" collapsible className="w-full">
        {invoices.map((exp, i) => (
          <AccordionItem value={exp.id} key={exp.id}>
            <AccordionTrigger>{exp.year}</AccordionTrigger>
              <AccordionContent>
                {userRole.role === "ADMIN" && (
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



