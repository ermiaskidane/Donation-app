import { auth } from "@clerk/nextjs/server";
// import { initialUser } from "@/lib/initial-user";
import { MembersClient } from "./components/client";
import { format } from "date-fns";
import { data } from "@/lib/data"
import { db } from '@/lib/db';
import { redirect } from "next/navigation";
import { MembersColumn } from "./components/columns";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members",
};


const MembersPage = async() => {
  
  const currentuser: User | null = await currentProfile()
  if (!currentuser) {
    return auth().redirectToSignIn();
  }

  if(currentuser.role === "GUEST"){
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
  // console.log(">>>>>>>>>>>>>>", members )

  const formattedMembers: MembersColumn[] = members.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    amount: item.amount,
    updatedAt: format(item.updatedAt, "MMMM do, yyyy"),
    donations: item.donations
  }))


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <MembersClient data={formattedMembers} userRole={currentuser}/>
      </div>
    </div>
  )
}

export default MembersPage;