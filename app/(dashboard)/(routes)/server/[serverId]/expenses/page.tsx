import React from 'react'
import { ExpenseClient } from './components/client'
import { db } from '@/lib/db'
// import { initialUser } from '@/lib/initial-user'
import { RedirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { currentProfile } from '@/lib/current-profile'
import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { Position } from '@prisma/client'


export const metadata: Metadata = {
  title: "Expense",
};

const ExpensePage = async({
  params
}: {
  params: { serverId: string }
}) =>{

  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }

  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

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
      <ExpenseClient yearlyExpense={expenseOfYear} donation={donation} userRole={UserRole}/>
    </div>
  )
}


export default ExpensePage