import { auth } from "@clerk/nextjs/server";
import { MembersClient } from "./components/client";
import { format } from "date-fns";
import { data } from "@/lib/data"
import { db } from '@/lib/db';
import { redirect } from "next/navigation";
import { MembersColumn } from "./components/columns";
import { currentProfile } from "@/lib/current-profile";
import { Position, Server, User } from "@prisma/client";
import { Metadata } from "next";
import toast from "react-hot-toast";

export const metadata: Metadata = {
  title: "Members",
};


const MembersPage = async({
  params
}: {
  params: { serverId: string }
}) => {
  
  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }
 
  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // if (!UserRole){
  //   // throw new Error("We dont have userRole")
  // }

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
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
        <MembersClient data={formattedMembers} userRole={UserRole} server={currentuser.server}/>
      </div>
    </div>
  )
}

export default MembersPage;