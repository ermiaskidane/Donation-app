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

interface CalenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onSubmit?: (data: CalenderModalValues) => void
}

const formSchema = z.object({
  year: z.coerce.number().min(1),
})

type CalenderModalValues = z.infer<typeof formSchema>

export const CalenderModal: React.FC<CalenderModalProps> = ({
  isOpen,
  onClose,
  loading,
  onSubmit
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<CalenderModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      year: 0
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
      title="Enter Expense of The Year"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
      {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
            {/* <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>year</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="write the year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            /> */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Enter year" {...field} />
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