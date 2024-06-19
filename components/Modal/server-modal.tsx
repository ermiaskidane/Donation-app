"use client";

import { useEffect, useState } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/file-upload";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Member, Server } from "@prisma/client";

interface ServerModalProps {
  isOpen: boolean;
  initialData?: Server[] | null;
  onClose: () => void;
  loading: boolean;
  onSubmit?: (datas: ServerModalValues) => void
}

const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().min(1),
})

export type ServerModalValues = z.infer<typeof formSchema>

export const ServerModal: React.FC<ServerModalProps> = ({
  isOpen,
  initialData,
  onClose,
  loading,
  onSubmit
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<ServerModalValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ||  {
      name: "",
      imageUrl: ""
    }
  })


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log("dfsdfs", initialData)

  return (
    <Modal
      title="Customize your server"
      description="Give your server a personality with a name and an image. You can always change it later."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        {/* @ts-ignore */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
               <div className="flex items-center justify-center text-center">
                 {/* TODO: file upload */}
                 <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      // className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Community name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        // className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <Button  disabled={loading} className="w-1/2 mt-8 self-center" >
                Create
              </Button>
            </div>
          </form>
        </Form>
    </Modal>
  );
};

