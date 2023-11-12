"use client";

import axios from "axios";
import React, {useState} from 'react'
import { toast } from "react-hot-toast";
import * as z from "zod"

import { UsersColumn } from './columns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BarChart4, Copy, Edit, MoreHorizontal, Trash, Trash2, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { AlertUserRoleModal } from '@/components/Modal/alert-userRoleModal';
import { AlertModal } from "@/components/Modal/alert-modal";

const FormSchema = z.object({
  type: z.enum(["Admin", "Member", "Guest"], {
    required_error: "You need to select a notification type.",
  }),
})

type CellActionValues = z.infer<typeof FormSchema>
interface CellActionProps {
  data: UsersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {

  const [loading, setLoading] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${data.id}`);
      toast.success('User deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const onSubmit = async (datas: CellActionValues) => {
    try {
      setLoading(true)

      await axios.patch(`/api/users/${data.id}`, datas)

      router.refresh();
      router.push('/users');
      toast.success("user has been updated")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
    }
  }

  return(
    <>
    <AlertUserRoleModal 
        isOpen={openUser} 
        onClose={() => setOpenUser(false)}
        loading={loading}
        onSubmit={onSubmit}
      />
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
            onClick={() => setOpenUser(true)}
          >
            <User className="mr-2 h-4 w-4" /> Manage User role 
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction