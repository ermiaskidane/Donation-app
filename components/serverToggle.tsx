"use client"

import { ChevronRight, CircleChevronRight, Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MemberRole, User } from "@prisma/client";
import { useModal } from "@/hooks/useModalStore";
import useServerStore from "@/hooks/useServerId";
import useInvite from "@/hooks/useInvite";
// import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
// import { ServerSidebar } from "@/components/server/server-sidebar";

export const ServerToggle = ({
  serverId,
  userRole,
  server
}: {
  serverId: string;
  userRole: MemberRole | undefined;
  server:  any
}) => {
  const {setServer, server: data} = useInvite()
  // console.log("dsafsdfdfd",data )
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="px-8">
          <ChevronRight/> Open
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className=" flex flex-col">
        <SheetHeader>
            <SheetTitle className="text-center">Community Service</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
        </SheetHeader>
        <div className="h-full w-full ">
        <div className="grid gap-2 py-1 font-medium">
          <ul className="grid cursor-pointer">
            <li className={cn("border-b-2 py-3", 
              pathname === `/server/${serverId}/blog` && "text-[#0084c1fb]"
            )}>
              <Link href={`/server/${serverId}/blog`}>Blog</Link>
            </li>
            {userRole === "ADMIN" &&
            <>
              <li className={cn("border-b-2 py-3", 
                pathname === `/server/${serverId}/write` && "text-[#0084c1fb]"
              )}>
                <Link href={`/server/${serverId}/write`}>Write</Link>
              </li>
              <li className={cn("border-b-2 py-3", 
                pathname === `/invite` && "text-[#0084c1fb]"
              )}>
                <h2 onClick={() => setServer(server)}>Invite People</h2>
              </li>
            </>
            }
            <li className={cn("border-b-2 py-3", 
              pathname === `/server/${serverId}/members` && "text-[#0084c1fb]"
            )}>
              <Link href={`/server/${serverId}/members`}>Members</Link>
            </li>
            <li className={cn("border-b-2 py-3", 
              pathname === `/server/${serverId}/expenses` && "text-[#0084c1fb]"
            )}>
              <Link href={`/server/${serverId}/expenses`}>Expenses</Link>
            </li>
          </ul>
          </div>
        </div>
          
      </SheetContent>
    </Sheet>
  )
}