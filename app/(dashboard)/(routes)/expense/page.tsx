import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
import {dataExpense} from '@/lib/data'
import { initialUser } from '@/lib/initial-user'


const invoices = [
  {
    // expense: "INV002",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    description: "Credit Card PayPal PayPal PayPal",
  },
  {
    // description: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    description: "PayPal",
  },
  {
    // description: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    description: "Bank Transfer",
  },
  {
    // description: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    description: "Credit Card",
  },
  {
    // description: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    description: "PayPal",
  },
  {
    // description: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    description: "Bank Transfer",
  },
  {
    // description: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    description: "Credit Card",
  },
]

const ExpensePage = async() =>{

  const user = await initialUser()
  
  const donated = await db.donation.findMany()

  const expense = await db.year.findMany({
    include: {
      expenses: true
    }
  })

  // Sort expense by the year in ascending order
  expense.sort((a, b) => (a.year) - (b.year));

  
  // console.log("@@@@@@@@@@@@@@@", expense)


  // console.log("::::::::::::::::::", donated)
  return (
    <div className="px-4">
      <ExpenseClient invoices={expense} donation={donated} userRole={user}/>
    </div>
  )
}


export default ExpensePage