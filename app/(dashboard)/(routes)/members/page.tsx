import { redirectToSignIn } from "@clerk/nextjs";
import { initialUser } from "@/lib/initial-user";
import { MembersClient } from "./components/client";
import { format } from "date-fns";
import { data } from "@/lib/data"
import { db } from '@/lib/db';
import { redirect } from "next/navigation";
import { MembersColumn } from "./components/columns";


const MembersPage = async() => {

  const user = await initialUser()
  // console.log("user", user)
  if (!user) {
    return redirectToSignIn();
  }

  if(user.role === "GUEST"){
    redirect("/");
  }

  const members = await db.member.findMany({
    include:{
      donations: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  const formattedMembers: MembersColumn[] = members.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    amount: item.amount,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  // console.log("::::::::::::::::::::::", members)
  // console.log(">>>>>>>>>>>>>>>>>", formattedMembers)
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MembersClient data={formattedMembers}/>
      </div>
    </div>
  )
}

export default MembersPage;