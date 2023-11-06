"use client";

import { useEffect, useState } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface InfoAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  onSubmit?: (data: InfoAddModalValues) => void
}

const formSchema = z.object({
  title: z.string().min(1),
})

type InfoAddModalValues = z.infer<typeof formSchema>

export const InfoAddModal: React.FC<InfoAddModalProps> = ({
  isOpen,
  onClose,
  loading,
  onSubmit
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<InfoAddModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {
      title: "",
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
      title="HeadLine Information"
      description=""
      info={true}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
      {/* @ts-ignore */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="write title of information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <Button disabled={loading} className="w-1/2 mt-8 self-center" type="submit">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};