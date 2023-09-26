"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading  from "@/components/Heading";
import { Separator } from "@/components/ui/separator";

import { MembersColumn, columns } from "./columns";

interface MembersClientProps {
  data: MembersColumn[];
}

export const MembersClient: React.FC<MembersClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return  (
    <>
    <div className="flex items-center justify-between">
    <Heading title={`Members ()`} subtitle="Manage members for your group" />
    {/* as mongodb has to check through ObjectIDwhich has hex string with 12 bytes I used a random number insted of string */}
    <Button onClick={() => router.push(`/members/6512c326f323f44d75c5414d`)} >
      <Plus className="mr-2 h-4 w-4" /> Add New
    </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}