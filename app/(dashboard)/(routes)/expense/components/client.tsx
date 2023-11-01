"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DataTable } from "@/components/ui/data-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {  columns } from "./columns";

interface ExpenseClientProps {
  invoices: any[];
}

export const ExpenseClient: React.FC<ExpenseClientProps> = ({
  invoices,
}) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Expenses in 2021</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
             {/* <Table>
              <TableCaption className='font-semibold text-black'>Total Expense in 2021: £2250</TableCaption>
              <TableCaption className='font-semibold text-black'>Total Amount in 2021: £10000 - £2250 = £7750</TableCaption>
              <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="pl-12 ">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.expense}>
                    <TableCell className="font-medium">{invoice.expense}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    <p className="pl-12 font-medium" >...</p>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Expenses in 2022</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
            {/* <Table>
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
              </Table> */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Expenses in 2023</AccordionTrigger>
          <AccordionContent>
          <DataTable hideContent={true} searchKey="name" columns={columns} data={invoices}/>
          <AccordionContent className='font-semibold text-black text-center pt-5'>Total Expense in 2021: £2250</AccordionContent>
          <AccordionContent className='font-semibold text-black text-center'>Total Amount in 2021: £10000 - £2250 = £7750</AccordionContent>
          {/* <Table>
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
            </Table> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}


