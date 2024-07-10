"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { UsersColumn, columns } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ServerToggle } from "@/components/serverToggle";
import { MemberRole, Position, Server, User } from "@prisma/client";

interface UsersClientProps {
  data: UsersColumn[],
  userRole: MemberRole,
  serverId: string;
  server: (Server & {positions: Position[]})
}

export const UsersClient: React.FC<UsersClientProps> = ({
  data,
  userRole,
  serverId,
  server
}) => {
  // const params = useParams();
  // const router = useRouter();
  return (
    <>
    <div className=" flex justify-end px-0">
      <ServerToggle server={server} serverId={serverId} userRole={userRole}/>
    </div>
    <div className="flex items-center justify-between">
    <Heading title={`Users (${data.length.toString()})`} subtitle="Manage users role" />
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}