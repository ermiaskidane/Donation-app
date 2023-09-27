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

const formSchema = z.object({
  dtime: z.string().min(1),
  amount: z.coerce.number().min(1),
})

type DonationFormValues = z.infer<typeof formSchema>

interface DonationFormProps {
  initialData: Donation | null
}

export const DonationForm: React.FC<DonationFormProps> = ({
  initialData
}) => {

  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit member' : 'Create member';
  const subtitle = initialData ? 'Edit a member.' : 'Add a new member';
  const toastMessage = initialData ? 'Member updated.' : 'Member created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      dtime: "",
      amount: 0,
    }
  })

  const onSubmit = async (data: DonationFormValues) => {
    console.log("@@@@@@@@@@@@@@@@@" ,params.memberId)
    try {
      setLoading(true)
      if(initialData) {
        console.log("update data")
      } else {
        await axios.post(`/api/donation/${params.memberId}`, data)
      }
      router.refresh();
      router.push("/members");
      toast.success(toastMessage);
    } catch(error: any){
      toast.error("something went wrong.")
    }finally{
      setLoading(false)
    }
    // console.log("£££££££££££££", )
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
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
            {/* <FormField
              control={form.control}
              name="categoryId"
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
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>{color.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}
