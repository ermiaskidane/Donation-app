import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoginModal from '@/components/Modal/LoginModal'
import RegisterModal from '@/components/Modal/registerModal'
import {ToasterProvider} from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Record Donation',
  description: 'Donation contribute by members',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <LoginModal />
          <RegisterModal/>
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}
