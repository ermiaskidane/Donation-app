import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {ToasterProvider} from '@/providers/toast-provider'
import { CrispProvider } from '@/components/crisp-provider'
import InfiniteSlide from '@/components/inifiniteslideInfo'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { ModalProvider } from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Donation Record",
    template: "%s - Donation Record"
  },
  description: 'Donation Record app for the community',
  twitter: {
    card: "summary_large_image",
  },
}


 const RootLayout = async({
  children,
}: {
  children: React.ReactNode
}) => {

  const currentClient = auth()

  const userId = currentClient?.userId ?? '';

  const user = await db.user.findFirst({where: {userId}})
 

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <CrispProvider/>
        <body className={inter.className}>
          <ToasterProvider/>
          <ModalProvider/>
          <Navbar currentUser={user}/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
