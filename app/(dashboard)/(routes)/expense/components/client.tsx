"use client"

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DataTable } from "@/components/ui/data-table";
import {  columns } from "./columns";
import { Button } from '@/components/ui/button';
import { ExpenseModal } from '@/components/Modal/expense-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Heading from '@/components/Heading';
import { Component, Plus, PoundSterling, User } from 'lucide-react';
import { CurrentAmountModal } from '@/components/Modal/currentAmount-modal';

// interface Donate {
//   id: string;
//   dtime: string;
//   amount: number;
//   memberId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface YearlyDonate {
//   year: string;
//   yearDonate: Donate[];
//   total: number;
// }

// interface ExpenseClientProps {
//   donation: Donate[];
// }

// // the steps we follow here are

// // 1.Preprocess the data to group expenses by year.
// // 2.Calculate the total expense for each year.
// // 3.Pass the preprocessed data to your component for rendering.


// // The groupExpensesByYear function groups expenses by year and calculates the total expenses for each year.
// const groupExpensesByYear = (donation: Donate[]): YearlyDonate[] => {
//   const groupedDonates: { [year: string]: Donate[] } = {};

//   donation.forEach((donate) => {
//     const year = donate.dtime.trim().split(',')[1]
//     if (groupedDonates[year]) {
//       groupedDonates[year].push(donate);
//     } else {
//       groupedDonates[year] = [donate];
//     }
//   });

//   const yearlyTotals: YearlyDonate[] = Object.keys(groupedDonates).map((year) => ({
//     year,
//     yearDonate: groupedDonates[year],
//     total: groupedDonates[year].reduce((acc, donate) => acc + donate.amount, 0),
//   }));

//   return yearlyTotals;
// };

// export const ExpenseClient: React.FC<ExpenseClientProps> = ({ donation }) => {
//   // The useState hook is used to calculate yearlyExpenses only once 
//   // when the component is initialized, which improves performance.

//   const yearlyExpenses = useState<YearlyDonate[]>(() => groupExpensesByYear(donation))[0];

//   // Sort yearlyExpenses by the year in ascending order
//   yearlyExpenses.sort((a, b) => parseInt(a.year) - parseInt(b.year));

//   // console.log("ZZZZZZZZZZZZZZZZZZ", invoices)
//   // console.log("KKKKKKKKKKKKKL", groupExpensesByYear(invoices))
//   console.log("KKKKKKKKKKKKKL", yearlyExpenses)
//   return (
//     <>
//       <Accordion type="single" collapsible className="w-full">
//         {yearlyExpenses.map((yearlyExpense) => (
//           <AccordionItem value={yearlyExpense.year} key={yearlyExpense.year}>
//             <AccordionTrigger>{`Expenses in ${yearlyExpense.year}`}</AccordionTrigger>
//             <AccordionContent>
//               <DataTable hideContent={true} searchKey="name" columns={columns} data={yearlyExpense.yearDonate} />
//               <AccordionContent className='font-semibold text-black text-center pt-5'>{`Total Expense in ${yearlyExpense.year}: £${yearlyExpense.total}`}</AccordionContent>
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </>
//   );
// };

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { DataTable } from "@/components/ui/data-table";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import {  columns } from "./columns";

// interface ExpenseClientProps {
//   invoices: any[];
// }

// const YearlyExpenses = [
//   {"Exyear": "Expenses in 2021"},
//   {"Exyear": "Expenses in 2022"},
//   {"Exyear": "Expenses in 2023"}
// ]

// // console.log(":::::::", Object.keys(YearlyExpenses))
// // console.log(":::::::", Object.values(YearlyExpenses)[i])

// export const ExpenseClient: React.FC<ExpenseClientProps> = ({
//   invoices,
// }) => {
//   return (
//     <>
//       <Accordion type="single" collapsible className="w-full">
//         {YearlyExpenses.map((year, i) => (
//           // <div key={Object.keys(year)[0]}></div>
//           <AccordionItem value={year.Exyear} key={Object.keys(year)[0]}>
//           <AccordionTrigger>{year.Exyear}</AccordionTrigger>
//           <AccordionContent>
//           <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
//           <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
//           <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
//           </AccordionContent>
//         </AccordionItem>
//         ))}
        
//       </Accordion>
//     </>
//   )
// }




interface ExpenseClientProps {
  invoices: any[];
  donation: any[]
}


const groupExpensesByYear = (expenses) => {
  const groupedExpenses = {};

  expenses.forEach((expense) => {
    const year = expense.dtime.trim().split(',')[1];
    if (groupedExpenses[year]) {
      groupedExpenses[year].push(expense);
    } else {
      groupedExpenses[year] = [expense];
    }
  });

  const yearlyTotals = Object.keys(groupedExpenses).map((year) => ({
    year,
    expenses: groupedExpenses[year],
    total: groupedExpenses[year].reduce((acc, expense) => acc + expense.amount, 0),
  }));

  return yearlyTotals;
};

export const YearlyExpenseSum = (spent) => {
  return spent.reduce((acc, total) => {
    return acc + total.amount
  }, 0)
}


export const ExpenseClient: React.FC<ExpenseClientProps> = ({
  invoices,
  donation
}) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [poundOpen, setPoundOpen] = useState(false);
  const [year, setYear] = useState();

  const yearlyExpenses = useState(() => groupExpensesByYear(donation))[0];
  // Sort yearlyExpenses by the year in ascending order
  yearlyExpenses.sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const TotalSum = (exp) => {
    // Find the yearly expenses object for the current year
    const yearlyExpense = yearlyExpenses.find((item) => Number(item.year) === exp.year);
  
    // console.log("~~~~~~~~~~~~~", yearlyExpense)
    if (yearlyExpense) {
      const total = yearlyExpense.total - YearlyExpenseSum(exp.expenses);
      return total;
    }
  
    return 0; // Handle the case when there's no matching yearly expense data
  };

  const OpenModal = (exp) => {
    setOpen(true);
    setYear(exp.year)

    console.log("BBBBBBBBBBBBBBB", exp)
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      console.log("KKKKKKKKKKKKK",{data, year})
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
  console.log(":?>>>>>>>>>><<<<<<<<<", invoices)
  console.log(":??????????????", yearlyExpenses)
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
        TotalExpense={invoices}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <h2 className="py-4 text-center text-xl font-bold sm:text-2xl">Yearly Expenses</h2>
        <div className="flex flex-col gap-2 md:flex-row">
          <Button onClick={() => setPoundOpen(true)} >
            <PoundSterling className="mr-2 h-4 w-4" /> Current Amount
          </Button>
        </div>
      </div>
      {/* <Heading title="Yearly Expenses" subtitle="Manage users role" center /> */}
      <Accordion type="single" collapsible className="w-full">
        {invoices.map((exp, i) => (
          <AccordionItem value={exp.id} key={exp.id}>
            <AccordionTrigger>{exp.year}</AccordionTrigger>
              <AccordionContent>
                <div className='flex justify-end'>
                  <Button onClick={() => OpenModal(exp)}>Add Expense</Button>
                </div>
              <DataTable hideContent={true} searchKey="name" columns={columns} data={exp.expenses}/>
              <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in {exp.year}: {YearlyExpenseSum(exp.expenses)} </AccordionContent>
                <AccordionContent className='font-semibold text-black text-center'>Total Amount in {exp.year}: {TotalSum(exp)}</AccordionContent>
              </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}



