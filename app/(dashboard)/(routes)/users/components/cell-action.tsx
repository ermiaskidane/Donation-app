"use client";

import axios from "axios";
import React, {useState} from 'react'
import { toast } from "react-hot-toast";

import { UsersColumn } from './columns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { BarChart4, Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/Modal/alert-modal';
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CellActionProps {
  data: UsersColumn;
}

const FormSchema = z.object({
  type: z.enum(["Admin", "Member", "Guest"], {
    required_error: "You need to select a notification type.",
  }),
})

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // console.log("£££££££££££££££££££££££", data.id)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log("LLLLLLLLL", data)
    console.log("LLLLLLLLL", data.type.toUpperCase())
  }

  const onConfirm = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(`/api/member/${data.id}`);
    //   toast.success('Product deleted.');
    //   router.refresh();
    // } catch (error) {
    //   toast.error('Something went wrong');
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
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
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Admin" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Admin
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Member" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Member
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Guest" />
                    </FormControl>
                    <FormLabel className="font-normal">Guest</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          {/* <DropdownMenuItem
            onClick={() => router.push(`/members/${data.id}/donation`)}
          >
            <Copy className="mr-2 h-4 w-4" /> {data.role}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${data.id}/chart`)}
          >
            <BarChart4 className="mr-2 h-4 w-4" /> BarChart
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/members/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update member
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete member
          </DropdownMenuItem> */}
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction