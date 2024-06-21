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
// import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
// import { ServerSidebar } from "@/components/server/server-sidebar";

export const ServerToggle = ({
  serverId
}: {
  serverId: string;
}) => {
  const pathname = usePathname();

  // console.log("path", serverId)
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
              pathname === "/community" && "text-[#0084c1fb]"
            )}>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li className={cn("border-b-2 py-3", 
              pathname === "Write" && "text-[#0084c1fb]"
            )}>
              <Link href={"/write"}>Write</Link>
            </li>
            <li className={cn("border-b-2 py-3", 
              pathname === "Write" && "text-[#0084c1fb]"
            )}>
              <Link href={`/server/${serverId}/members`}>Members</Link>
            </li>
            <li className={cn("border-b-2 py-3", 
              pathname === "Write" && "text-[#0084c1fb]"
            )}>
              <Link href={"/expense"}>Expense</Link>
            </li>
          </ul>
          </div>
        </div>
          
      </SheetContent>
    </Sheet>
  )
}