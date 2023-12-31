"use client";

import { useEffect, useState } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onSubmit?: (datas: ExpenseModalValues) => void
}

const formSchema = z.object({
  description: z.string().min(1),
  paymentStatus: z.string().min(1),
  amount: z.coerce.number().min(1),
})

type ExpenseModalValues = z.infer<typeof formSchema>

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  loading,
  onSubmit
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<ExpenseModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      description: "",
      paymentStatus: "",
      amount: 0
    }
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Manage Expenses of The Year"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
      {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="what is the expense" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PaymentStatus</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="paid or unpaid" {...field} />
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
            <Button disabled={loading} className="w-1/2 mt-8 self-center" type="submit">
              create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};