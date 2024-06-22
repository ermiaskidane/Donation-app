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


const MembersPage = async({
  params
}: {
  params: { serverId: string }
}) => {
  
  const currentuser: User | null = await currentProfile()
  if (!currentuser) {
    return auth().redirectToSignIn();
  }

  if(currentuser.role === "GUEST"){
    redirect("/");
  }

  // console.time('Deep Nested Fetch');
  // const memberss = await db.server.findUnique({
  //   where: {
  //     id: params.serverId
  //   },
  //   include:{
  //     members: {
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //       include: {
  //         donations: true
  //       }
  //     },
  //   },
  // })

  // console.timeEnd('Deep Nested Fetch');

  // console.time('Separate Queries');

  const serverWithMembers = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
    include: {
      members: {
        orderBy: {
          createdAt: 'desc',
        }    
      },
    }
  });

  if (!serverWithMembers) {
    redirect("/community")
  }

  const memberIds = serverWithMembers.members.map(member => member.id);

  const donations = await db.donation.findMany({
    where: {
      memberId: {
        in: memberIds,
      },
    },
  });

  // Combine members and donations
const membersWithDonations = serverWithMembers.members.map(member => {
  return {
    ...member,
    donations: donations.filter(donation => donation.memberId === member.id),
  };
});
// console.timeEnd('Separate Queries');

const formattedMembers: MembersColumn[] = membersWithDonations.map((item) => ({
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
      <div className="flex-1 space-y-4 px-8 ">
        <MembersClient data={formattedMembers} userRole={currentuser}/>
      </div>
    </div>
  )
}

export default MembersPage;