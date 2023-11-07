import React from 'react'
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import NotifyUser from '@/components/notifyUser'


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

  if (!user) {
    return redirectToSignIn();
  } 

  if(user.role === "GUEST"){
    // redirect("/")
    // check out later
    return <NotifyUser/>
  }
  
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