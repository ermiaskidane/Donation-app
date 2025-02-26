"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import useServerStore from "@/hooks/useServerId";

interface navbarProps {
  currentUser: User | null;
}

const Navbar = ({currentUser}: navbarProps) => {
  const pathName = usePathname();
  const { userId } = useAuth();
  const serverId = useServerStore((state) => state.serverId);

  const [isOpen, setIsOpen] = useState(false)

  // mobile ToggleBar
  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  return (
    <div className={cn("bg-white", serverId && "mt-10")}>
    <header className=" relative border-b border-gray-200">
        <div className="relative  px-4 py-4 flex justify-between items-center">
            <div className="flex items-center z-20 ">
                <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
                <h1 className="text-xl font-semibold">MAHBER(ማሕበር)</h1>
            </div>
            <nav className="hidden sm:flex items-center">
                <Link href="/" className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>Home</Link>
                <Link href="/community" className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/community" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>Community</Link>
                <Link href="/blog" className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/blog" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>Blog</Link>
                {currentUser && userId && ( <Link href="/profile" className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/profile" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>Profile</Link>)}
                <Link href="/about" className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/about" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>About</Link>
                {!userId && (
                  <>
                    <SignedOut>
                    <SignInButton>
                      <button className={cn("hover:text-primary block transition dark:hover:text-white sm:px-4 sm:text-base", pathName === "/sign-in" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}>sign in</button>
                    </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </>
                )}
                <div className={`${userId ? "ml-5 mt-2.5 -translate-y-1": "" }`}>
                  <UserButton afterSignOutUrl='/' />
                </div>
            </nav>
            <div className="relative z-20   max-h-10 items-center sm:hidden">
              <button aria-label="humburger" id="hamburger" className="relative -mr-6 p-6" onClick={toggleOpen}>
                <div aria-hidden="true" id="line" className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
                <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300"></div>
              </button>
            </div>
        </div>
        {isOpen && (
          <>
          <div id="navLayer" aria-hidden="true" className="fixed inset-0 z-10 h-screen w-screen origin-top scale-y-100  bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"></div>
            <div id="navlinks" className="visible absolute left-0 z-20 w-full origin-top-right translate-y-1 scale-100 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-100 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:invisible lg:none   ">
            <ul className="flex flex-col gap-4 tracking-wide">  
              <li>
                <Link href="/" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  pathName === "/"  ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')} onClick={() => setIsOpen(false)}>Home</Link>
              </li>
              <li>
                <Link href="/community" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  pathName === "/community"  ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')} onClick={() => setIsOpen(false)}>Community</Link>
              </li>
              <li>
                <Link href="/blog" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  pathName === "/blog"  ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')} onClick={() => setIsOpen(false)}>Blog</Link>
              </li>
              {currentUser && userId && (
                <li>
                  <Link href="/profile" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  pathName === "/profile"  ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')} onClick={() => setIsOpen(false)}>Profile</Link>
                </li>
              )}
              <li>
                <Link href="/about" className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base",  pathName === "/about"  ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')} onClick={() => setIsOpen(false)}>About</Link>
              </li>
              {!userId && (
                <li className="" onClick={() => setIsOpen(false)}>
                    <>
                      <SignedOut>
                      <SignInButton>
                        <button 
                          className={cn("hover:text-primary block transition dark:hover:text-white md:px-4 md:text-base", pathName === "/sign-in" ? 'text-black font-medium dark:text-white' : 'text-muted-foreground')}
                        >
                          sign in
                        </button>
                      </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </>
                </li>
              )}
              <li>
                <div className={`${userId ? "mt-2 -translate-y-1": "" }`}>
                  <UserButton afterSignOutUrl='/' />
                </div>
              </li>
            </ul>
            </div>
          </>
        )}
    </header>
</div>
  )
}

export default Navbar;
