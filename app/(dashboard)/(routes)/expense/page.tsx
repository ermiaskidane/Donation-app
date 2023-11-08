import React from 'react'
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
import { initialUser } from '@/lib/initial-user'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'



const ExpensePage = async() =>{

  const user = await initialUser()

  if (!user) {
    return redirectToSignIn();
  } 

  if(user.role === "GUEST"){
    redirect("/")
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