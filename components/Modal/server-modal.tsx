

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
  name: z.string().min(1),
  // image: z.string().min(1),
  // name: z.coerce.number().min(1),
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
      name: ""
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
      title="Customize your server"
      description="Give your server a personality with a name and an image. You can always change it later."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="gap-6 flex flex-col md:w-11/12 mx-auto">
               <div className="flex items-center justify-center text-center">
                 {/* TODO: file upload */}
                 {/* <FormField
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
                /> */}
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
            
              <Button  disabled={loading} className="w-1/2 mt-8 self-center" type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
    </Modal>
  );
};
// "use client";

// import axios from "axios";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form"; 
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// // import { FileUpload } from "@/components/file-upload";
// import { useRouter } from "next/navigation";
// import { Modal } from "../ui/modal";

// interface ServerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const formSchema = z.object({
//   name: z.string().min(1, {
//     message: "Server name is required."
//   }),
//   // imageUrl: z.string().min(1, {
//   //   message: "Server image is required."
//   // })
// });

// export const ServerModal: React.FC<ServerModalProps> = ({
//   isOpen,
//   onClose
// }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       // imageUrl: "",
//     }
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log(values)
//     // try {
//     //   await axios.post("/api/servers", values);

//     //   form.reset();
//     //   router.refresh();
//     //   window.location.reload();
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   }

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <Modal
//     title="Customize your server"
//     description="Give your server a personality with a name and an image. You can always change it later."
//     isOpen={isOpen}
//     onClose={onClose}
//   >
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="space-y-8 px-6">
//               <div className="flex items-center justify-center text-center">
//                 {/* TODO: file upload */}
//                 {/* <FormField
//                   control={form.control}
//                   name="imageUrl"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <FileUpload
//                           endpoint="serverImage"
//                           value={field.value}
//                           onChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 /> */}
//               </div>

//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel
//                       className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
//                     >
//                       Server name
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         disabled={isLoading}
//                         className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
//                         placeholder="Enter server name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
        //           </FormItem>
        //         )}
        //       />
        //     </div>
        //       <Button variant="secondary" disabled={isLoading}>
        //         Create
        //       </Button>
        //   </form>
        // </Form>
//     </Modal>
//   )
// }
