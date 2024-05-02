import React from 'react'
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
// import { initialUser } from '@/lib/initial-user'
import { RedirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { currentProfile } from '@/lib/current-profile'


const ExpensePage = async() =>{

  const currentuser = await currentProfile()

  if (!currentuser) {
    return <RedirectToSignIn/>;
  } 

  if(currentuser.role === "GUEST"){
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
      <ExpenseClient invoices={expense} donation={donated} userRole={currentuser}/>
    </div>
  )
}


export default ExpensePage