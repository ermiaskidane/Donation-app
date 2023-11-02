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

interface ExpenseClientProps {
  invoices: any[];
}

const YearlyExpenses = [
  {"Exyear": "Expenses in 2021"},
  {"Exyear": "Expenses in 2022"},
  {"Exyear": "Expenses in 2023"}
]

// console.log(":::::::", Object.keys(YearlyExpenses))
// console.log(":::::::", Object.values(YearlyExpenses)[i])

export const ExpenseClient: React.FC<ExpenseClientProps> = ({
  invoices,
}) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {YearlyExpenses.map((year, i) => (
          // <div key={Object.keys(year)[0]}></div>
          <AccordionItem value={year.Exyear} key={Object.keys(year)[0]}>
          <AccordionTrigger>{year.Exyear}</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
          </AccordionContent>
        </AccordionItem>
        ))}
        
      </Accordion>
    </>
  )
}

{/* <AccordionItem value="item-2">
          <AccordionTrigger>Expenses in 2022</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
            <Table>
                <TableCaption className='font-semibold text-black'>Total Expense in 2022: £2250</TableCaption>
                <TableCaption className='font-semibold text-black'>Total Amount in 2022: £10000 - £2250 = £7750</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.expense}>
                      <TableCell className="font-medium">{invoice.expense}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Expenses in 2023</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
          <Table>
            <TableCaption className='font-semibold text-black'>Total Expense in 2023: £2250</TableCaption>
            <TableCaption className='font-semibold text-black'>Total Amount in 2023: £10000 - £2250 = £7750</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.expense}>
                    <TableCell className="font-medium">{invoice.expense}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem> */}


