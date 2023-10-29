import { Facebook, Mail,Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Slider from "@/components/Sliders"

function About() {
  return (
    <>
      <div className="mt-4.5">
        <div className="space-y-2 pb-6 pt-6 md:space-y-5">
          <h2 className="text-2xl text-center font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100  sm:leading-10 md:text-4xl md:leading-14">
            About Us
          </h2>
        </div>
        <div className="items-start px-6 space-y-2 md:px-20 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
              <Image
                src="/images/Screenshot (247).png"
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">St. Micheal Church</h3>
            <div className="text-gray-500 dark:text-gray-400">Manchester</div>
            <div className="text-gray-500 dark:text-gray-400">Eritrean Orthodox</div>
            <div className="flex space-x-3 pt-6">
              <Link href="/">
                <Mail />
              </Link>
              <Link href="/">
                <Facebook/>
              </Link>
              <Link href="/">
                <Youtube/>
              </Link>
            </div>
          </div>
          <div className="prose text-sm max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2 md:text-base">
              The Eritrean Church in Manchester is a vibrant and integral part of the city's 
              diverse religious landscape. Located in the heart of Manchester, this church serves
               as a spiritual and cultural center for the Eritrean community in the region.
               With its colorful and ornate architecture, it stands as a beautiful testament to Eritrean heritage. 
            <br />
            <br/>
              The church plays a crucial role in fostering a sense of community and belonging among Eritrean 
              expatriates, offering religious services, cultural events, and a place for Eritreans to celebrate 
              their rich traditions.
            <br />
            <br/>
            It serves as a bridge between the Eritrean diaspora and their homeland, providing a sense of connection and continuity in a foreign land.
          </div>
        </div>
        <Slider/>
      </div>
    </>
  )
}

export default About