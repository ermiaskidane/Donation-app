"use client";

import { useParams, usePathname } from "next/navigation";
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import Link from "next/link";
import { ChurchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathName = usePathname();
  const params = useParams() 

  const routes = [
    {
      href: `/home`,
      label: "Home",
      active: pathName === `/home`
    },
    {
      href: `/blog`,
      label: "Blog",
      active: pathName === `/blog`
    },
    {
      href: `/about`,
      label: "About",
      active: pathName === `/about`
    },
    {
      href: `/login`,
      label: "Login",
      active: pathName === `/login`
    }
    // {
    //   href: `/contact`,
    //   label: "Contact Us",
    //   active: pathName === `/contact`
    // }
  ]
  return (
    <div className="bg-stone-700 h-16 my-auto  ">
      <div className="flex justify-between items-center h-full">
        {/* Logo */}
        <div className="ml-12">
          <ChurchIcon className="ml-auto h-8 w-8 shrink-0 opacity-50"/>
        </div>

        <div className=" flex items-center space-x-4 lg:space-x-10 px-20">
          {/* Menu Bar */}
          {routes.map((route) => (
            <Link
            key={route.href}
            href={route.href}
            className={cn("text-sm font-medium transition-colors hover:text-primary", route.active ? "text-black dark:text-white": "text-muted-foreground")}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar;