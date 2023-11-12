import './globals.css'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {ToasterProvider} from '@/providers/toast-provider'
import { CrispProvider } from '@/components/crisp-provider'
import InfiniteSlide from '@/components/inifiniteslideInfo'
import { db } from '@/lib/db'
import InfoNavbar from '@/components/InfoNavbar'
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { initialUser } from '@/lib/initial-user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Record Donation',
  description: 'Donation contribute by members',
}


 const RootLayout = async({
  children,
}: {
  children: React.ReactNode
}) => {

  const currentClient = await currentUser()

  // console.log("££££££££££££££££", currentClient)

  const info = await db.info.findMany()
  const user = await db.user.findFirst({where: {userId: currentClient?.id}})
 
  // console.log("^^^^^^^^^^^^^^^^^^^^^^^", user)
  return (
    <ClerkProvider>
      <html lang="en">
      <CrispProvider/>
        <body className={inter.className}>
          <ToasterProvider/>
          <InfiniteSlide infoList={info} currentUser={user}/>
          <InfoNavbar/>
          <Navbar currentUser={user}/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
