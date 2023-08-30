import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoginModal from '@/components/Modal/LoginModal'
import RegisterModal from '@/components/Modal/registerModal'

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
    <html lang="en">
      <body className={inter.className}>
        <LoginModal />
        <RegisterModal/>
        <Navbar/>
         {children}
        <Footer/>
        </body>
    </html>
  )
}
