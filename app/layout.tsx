import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {ToasterProvider} from '@/providers/toast-provider'
import { CrispProvider } from '@/components/crisp-provider'
import InfiniteSlide from '@/components/inifiniteslide'
import { db } from '@/lib/db'

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

  const info = await db.info.findMany()

  return (
    <ClerkProvider>
      <html lang="en">
      <CrispProvider/>
        <body className={inter.className}>
          <ToasterProvider/>
          <InfiniteSlide infoList={info}/>
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
