"use client";

import { useCallback, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import Link from "next/link";
import { ChurchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import InfoNavbar from "./InfoNavbar";
import useInfoModal from "@/hooks/useInfo";
import { User } from "@prisma/client";
import useServerStore from "@/hooks/useServerId";

interface navbarProps {
  currentUser: User | null;
}

const Navbar = ({currentUser}: navbarProps) => {
  const pathName = usePathname();
  const infoModal = useInfoModal(); 
  const { userId } = useAuth();
  const serverId = useServerStore((state) => state.serverId);

  const [isOpen, setIsOpen] = useState(false)

  // mobile ToggleBar
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  },[])

  // console.log("isOpen", isOpen)

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathName === `/`
    },
    {
      href: `/blog`,
      label: "Blog",
      active: pathName === `/blog`
    },
    // {
    //   href: `/write`,
    //   label: "Write",
    //   active: pathName === `/write`
    // },
    // {
    //   href: `/community`,
    //   label: "Community",
    //   active: pathName === `/community`
    // },
    // {
    //   href: `/members`,
    //   label: "Members",
    //   active: pathName === `/members`
    // },
    // {
    //   href: `/expense`,
    //   label: "Expense",
    //   active: pathName === `/expense`
    // },
    // {
    //   href: `/profile`,
    //   label: "Profile",
    //   active: pathName === `/profile`
    // },
    // {
    //   href: `/about`,
    //   label: "About",
    //   active: pathName === `/about`
    // },
  ]

  const renderConditional = () => {
    if(!userId){
      return (
      <>
        <li>
          <Link href="/about" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/about" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>
            <span onClick={() => setIsOpen(false)}>About</span>
          </Link>
        </li>
        <li>
          <SignedOut>
            <SignInButton>
              <button className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/sign-in" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
      </> 
      )}

    if (currentUser && userId) {
      return (<>
              {currentUser.role === "ADMIN" && 
                <li>
                  <Link href="/write" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/write" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>
                    <span onClick={() => setIsOpen(false)}>Write</span>
                  </Link>
                </li>
              }
              <li>
                <Link href="/profile" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/profile" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>
                  <span onClick={() => setIsOpen(false)}>Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/about" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>
                  <span onClick={() => setIsOpen(false)}>About</span>
                </Link>
              </li>
              {/* {currentUser.role === "ADMIN" &&
              <li>
                <p className="cursor-pointer hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base">
                  <span onClick={infoModal.onOpen}>Info</span>
                </p>
              </li>
              } */}
            </>)
    }

    return null 
  }

  return (
    <header className={cn("", serverId && "mt-10")}>
    <nav className=" z-10 w-full border-b border-black/5 dark:border-white/5 lg:border-transparent">
        <div className=" mx-auto px-6 md:px-12 xl:px-6">
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 md:gap-0 md:py-4">
                <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
                    <Link href="/#home" aria-label="logo" className="flex items-center space-x-2">
                        <div aria-hidden="true" className="flex space-x-1">
                            <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                            <div className="h-6 w-2 bg-primary"></div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Micheal</span>
                    </Link>

                    <div className="relative flex max-h-10 items-center lg:hidden">
                        <button aria-label="humburger" id="hamburger" className="relative -mr-6 p-6" onClick={toggleOpen}>
                            <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
                            <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
                        </button>
                    </div>
                </div>
                <div id="navLayer" aria-hidden="true" className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"></div>
                <div id="navlinks" className="invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-7/12 lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none">
                    <div className="w-full flex text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                        <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                            {
                                routes.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                          href={link.href}
                                          className={
                                          cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", 
                                          link.active ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}
                                        >
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                          {renderConditional()}
                        </ul>
                        <div className={`${userId ? "ml-5 -translate-y-1": "" }`}>
                          <UserButton afterSignOutUrl='/' />
                        </div>
                    </div>
                </div>
                
                {/* for mobile NavBar  */}
                {isOpen && (
                  <>
                  <div id="navLayer" aria-hidden="true" className="fixed inset-0 z-10 h-screen w-screen origin-top scale-y-100  bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"></div>
                    <div id="navlinks" className="visible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-100 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-100 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:invisible lg:none   ">
                    <div className="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                        <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                            {
                                routes.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  link.active ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>
                                            <span onClick={() => setIsOpen(false)}>{link.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            {renderConditional()}
                        </ul>
                        <div className={`${userId ? "ml-4 translate-y-6": "" }`}>
                          <UserButton afterSignOutUrl='/' />
                        </div>
                    </div>
                </div>  
                </>
                )}
            </div>
        </div>
    </nav>
</header>
  )
}

export default Navbar;
