"use client";

import { Plus, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading  from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
 
import { MembersColumn, columns } from "./columns";
import { Member, MemberRole, Server, User as userRole} from "@prisma/client";
import { Fragment, useEffect } from "react";
import useUserRoleStore from "@/hooks/useUserRole";
import { ServerToggle } from "@/components/serverToggle";
// import AlertDemo from "@/components/UserInformation";

interface MembersClientProps {
  data: MembersColumn[];
  userRole: MemberRole | undefined;
  server: (Server & {members: Member[]})
}
  
export const MembersClient: React.FC<MembersClientProps> = ({
  data,
  userRole,
  server
}) => {
  const router = useRouter();
  const params = useParams();

  const { roleUser, setRoleUser} = useUserRoleStore()

  // change the defualt Zustand Guest to the actual current userrole
  useEffect(() => {
      setRoleUser(userRole);
  }, [userRole, setRoleUser]);

  const totalDonationsAmount = data.reduce((total, item) => {
    const donationsAmount = item.donations.reduce((donationTotal, donation) => {
        return donationTotal + donation.amount;
    }, 0);

    return total + donationsAmount;
  }, 0);

  return  (
    <>
    {/*     <AlertDemo/> */}
    <div className=" flex justify-end px-0">
      {/*@ts-ignore*/}
      <ServerToggle serverId={params.serverId} userRole={userRole} server={server}/>
    </div>
    <div className="flex items-center justify-between">
    <Heading title={`Members (${data.length.toString()})`} subtitle={`Total Amount of Money £${totalDonationsAmount}`} />
    {userRole === "ADMIN" && (
      <div className="flex flex-col gap-2 md:flex-row">
        <Button onClick={() => router.push(`/server/${params.serverId}/users`)} >
          <User className="mr-2 h-4 w-4" /> Manage User
        </Button>
        {/* as mongodb has to check through ObjectIDwhich has hex string with 12 bytes I used a random number insted of string */}
        <Button onClick={() => router.push(`/server/${params.serverId}/members/6512c326f323f44d75c5414d`)} >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
    )}
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data}/>
    </>
  )
}
