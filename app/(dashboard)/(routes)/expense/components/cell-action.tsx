"use client";

import axios from "axios";
import React, { useState} from 'react'
import { toast } from "react-hot-toast";

// import { MembersColumn } from './columns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {  MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AlertModal } from "@/components/Modal/alert-modal";
import useUserRoleStore from "@/hooks/useUserRole";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { roleUser} = useUserRoleStore()

  console.log("EEEEEEEEEEEEE", roleUser)

  const onConfirm = async () => {
    try {
      setLoading(true);
      console.log("JJJJJJJJJJJJ", data)
      await axios.delete(`/api/expense/${data.id}`);
      toast.success('Expense deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  if (roleUser !=="ADMIN"){
    return null
  }

  return(
    <>
    <AlertModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete Expense
              </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction



// Breaking News 1 The church plays a crucial role in fostering a sense of community and belonging among Eritrean expatriates, offering religious services, cultural events, and a place for Eritreans to celebrate their rich traditions.
// Latest Updates on COVID-19
// Technology Advancements in 2023
// World Economy Outlook
// Sports Highlights of the Week