import { Facebook, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='px-20 pt-20 pb-10'>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-8 items-center justify-between md:flex-row">
          <ul className="list-none flex space-x-4 md:flex-initial md:w-64 md:flex md:justify-center md:self-end md:-translate-y-4 md:font-medium">
            <li><Link href="/" className="font-bold text-xl"><Instagram className='' /></Link></li>
            <li><Link href="/" className="font-bold text-xl"><Facebook  className='' /></Link></li>
            <li><Link href="/" className="font-bold text-xl"><Youtube className='' /></Link></li>
          </ul>

          <div className='text-sm md:flex-initial md:w-64 md:text-base md:font-medium'>
            <p>100 Bruce street, leicester, <span className='block'>LE3 4RS United Kingdom</span></p>
          </div>

          <div className='text-sm md:flex-initial md:w-64 md:text-base md:font-medium'>
            <p>
              011234534 phone
              <span className='block'>test@test.com</span>
            </p>
          </div>
        </div>

        <div className='self-center'>
        <Image
          className="translate-x-12 md:translate-x-0"
          src="/images/Screenshot (246).png"
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <p className='text-sm pt-4 md:-translate-x-12 md:text-base'>© ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer