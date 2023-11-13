import { redirectToSignIn } from "@clerk/nextjs";
import { initialUser } from "@/lib/initial-user";
import { MembersClient } from "./components/client";
import { format } from "date-fns";
import { data } from "@/lib/data"
import { db } from '@/lib/db';
import { redirect } from "next/navigation";
import { MembersColumn } from "./components/columns";
import { currentProfile } from "@/lib/current-profile";
import { User } from "@prisma/client";


const MembersPage = async() => {
  // due to the middleware which put "/" both in auth and publicRoute I had to place initialUser on members page
  //  and .env after logged in redirect me to /members page so the home page can be accessed 
  // without logged in and user could be created in database. Somehow await initialUser() is called twice caused to create
  // two times for the new user, to handle this Admin can delete manually in the /users page 
  const Initialuser  = await initialUser()

  console.log(Initialuser)
  
  const currentuser: User | null = await currentProfile()
  // console.log("user", user)
  if (!currentuser) {
    return redirectToSignIn();
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