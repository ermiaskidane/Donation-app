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
    <Heading title={`Products ()`} subtitle="Manage products for your store" />
    <Button onClick={() => router.push(`/members/new`)} >
      <Plus className="mr-2 h-4 w-4" /> Add New
    </Button>
    </div>
    <Separator />
    <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}