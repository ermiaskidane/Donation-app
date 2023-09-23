"use client"

import * as z from "zod"
import axios from "axios"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import Heading from '../../../../../../components/Heading'
import { Button } from '../../../../../../components/ui/button'
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, Member, Donation } from "@prisma/client"

const formSchema = z.object({
  name: z.string().min(1),
  phone: z.coerce.number().min(1),
  email: z.string().min(1),
  amount: z.coerce.number().min(1),
})

type MemberFormValues = z.infer<typeof formSchema>

interface MemberFormProps {
  initialData: Member | null
  // initialData?: {
  //   name?: string,
  //   phone?: number,
  //   email?: string,
  //   amount?: number} | null;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit member' : 'Create member';
  const subtitle = initialData ? 'Edit a member.' : 'Add a new member';
  const toastMessage = initialData ? 'Member updated.' : 'Member created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      phone: 0,
      email: "",
      amount: 0
    }
  })

  const onSubmit = async (data: MemberFormValues) => {
    try {
      setLoading(true)

      // if(initialData){
      //   await axios.patch(`/api/member/${params.memberId}`, data)
      // } else {
        await axios.post(`/api/member/${params.memberId}`, data)
      // }

      router.refresh();
      router.push('/members');
    } catch(error: any){
      console.log("something went wrong")
      // toast.error('Something went wrong.');
    } finally{
      setLoading(false);
    }
    // console.log("MemberFormValues type", data)
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <Heading title={title} subtitle={subtitle} center />
          {initialData && (
            <Button 
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4"/>
            </Button>
          )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-1/2 mx-auto">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="member email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="01123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-1/2 mt-8 lg:self-center" type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
