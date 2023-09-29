"use client"

import React, {useState} from 'react'
import * as z from "zod"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { Donation } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  dtime: z.string().min(1),
  amount: z.coerce.number().min(1),
})

type DonationFormValues = z.infer<typeof formSchema>

interface DonationFormProps {
  initialData: Donation | null
  updateDonation: Donation[] | undefined
}

export const DonationForm: React.FC<DonationFormProps> = ({
  initialData,
  updateDonation
}) => {

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit donation' : 'Create donation';
  const subtitle = initialData ? 'Edit a donation.' : 'Add a new donation';
  const toastMessage = initialData ? 'Donation updated.' : 'Donation created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dtime: "",
      amount: 0,
    }
  })

  // currentMemberId used as query from the cell-action.tsx to create
  // for the trageted member 
  const currentMemberId = searchParams.get('id')

  const onSubmit = async (data: DonationFormValues) => {
    try {
      setLoading(true)
      if(initialData) {
        // note that data.dtime is the Id of selected donation even though is displayed as
        // date time it pass as Id due to value={donated.id} line 107
        await axios.patch(`/api/donation/${params.memberId}/${data.dtime}`, data);
      } else {
        await axios.post(`/api/donation/${currentMemberId}`, data)
      }
      router.refresh();
      router.push("/members");
      toast.success(toastMessage);
    } catch(error: any){
      toast.error("something went wrong.")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            {initialData ? (
            <>
            <FormField
              control={form.control}
              name="dtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {updateDonation?.map((donated) => (
                        <SelectItem key={donated.id} value={donated.id}>{donated.dtime}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            ) : (
              <>
                <FormField
                control={form.control}
                name="dtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="date of donation" {...field} />
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
                      <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
