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
        <div className="items-start px-16 space-y-2 md:px-28 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
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
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique eligendi quibusdam, doloremque ab blanditiis hic at omnis, 
            distinctio vero culpa voluptas minima recusandae suscipit reprehenderit cumque nobis inventore accusantium illum.
            <br />
            <br/>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eius cupiditate suscipit aperiam assumenda necessitatibus 
            magnam totam, nulla at? Hic, totam! Magnam illo ea fugiat.

            <br />
            <br/>
            Architecto animi eos iure doloremque debitis mollitia veritatis 
            sed voluptate maiores, modi consectetur, illum ipsam nobis? Autem iure quibusdam, 
            dignissimos animi vero sunt, repudiandae quam. Id, esse?
          </div>
        </div>
        <Slider/>
      </div>
    </>
  )
}

export default About