import React from 'react'
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { AuthMembers } from '@/lib/authMembers'


export const metadata: Metadata = {
  title: "Expense",
};

const ExpensePage = async({
  params
}: {
  params: { serverId: string }
}) =>{

  const {UserRole, currentuser} =  await AuthMembers(params.serverId)

  const serverExpense = await db.server.findUnique({
    where: {
      id: params.serverId,
    }
  });

  if (!serverExpense) {
    redirect("/community")
  }

  const expenseOfYear = await db.year.findMany({
    where: {
      serverId: params.serverId, 
    },
    include: {
      expenses: true
    }
  })
  
  const donation = await db.member.findMany({
    where: {
      serverId: params.serverId,
    },
    include: {
      donations: true,
    }
  })

  // Sort expense by the year in ascending order
  expenseOfYear.sort((a, b) => (a.year) - (b.year));

  return (
    <div className="px-8">
      <ExpenseClient yearlyExpense={expenseOfYear} donation={donation} userRole={UserRole} server={currentuser.server!}/>
    </div>
  )
}


export default ExpensePage