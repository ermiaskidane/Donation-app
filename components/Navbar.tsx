"use client";

import { useCallback, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import Link from "next/link";
import { ChurchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useLoginModal from "@/hooks/useLoginModal";

const Navbar = () => {
  const pathName = usePathname();
  const params = useParams() 

  const loginModal = useLoginModal()

  const [isOpen, setIsOpen] = useState(false)

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
    {
      href: `/about`,
      label: "About",
      active: pathName === `/about`
    },
    // {
    //   href: `/contact`,
    //   label: "Contact Us",
    //   active: pathName === `/contact`
    // }
  ]
  return (
    <header>
    <nav className=" z-10 w-full border-b border-black/5 dark:border-white/5 lg:border-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
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
                    <div className="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                        <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                            {
                                routes.map((link) => (
                                    <li>
                                        <Link 
                                          key={link.label} 
                                          href={link.href}
                                          className={
                                          cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", 
                                          link.active ? 'text-black dark:text-white' : 'text-muted-foreground')}
                                        >
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            <li>
                              <Link href="/login" className="hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base">
                                  <span>members</span>
                              </Link>
                            </li>
                            <li>
                              <p
                                onClick={loginModal.onOpen} 
                                className="hover:text-primary cursor-pointer block transition dark:hover:text-white md:px-4 md:text-base"
                              >
                                  <span>Login</span>
                              </p>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-12 lg:mt-0">
                    </div>
                </div>

                {isOpen && (
                  <>
                  <div id="navLayer" aria-hidden="true" className="fixed inset-0 z-10 h-screen w-screen origin-top scale-y-100  bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"></div>
                    <div id="navlinks" className="visible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-100 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-100 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:invisible lg:none   ">
                    <div className="w-full text-gray-600 dark:text-gray-200 lg:w-auto lg:pr-4 lg:pt-0">
                        <ul className="flex flex-col gap-6 tracking-wide lg:flex-row lg:gap-0 lg:text-sm">
                            {
                                routes.map((link) => (
                                    <li>
                                        <Link href={link.href} className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  link.active ? 'text-black dark:text-white' : 'text-muted-foreground')}>
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            <li>
                              <Link href="/login" className="hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base">
                                  <span>members</span>
                              </Link>
                            </li>
                            <li>
                              <p 
                              onClick={loginModal.onOpen} 
                              className=" text-gray-600 cursor-pointer hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base ">
                                  <span>Login</span>
                              </p>
                            </li>
                        </ul>
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