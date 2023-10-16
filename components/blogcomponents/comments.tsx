'use client'

import Loading from '@/app/loading';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const Comments = () =>{
  const { isSignedIn } = useAuth();
  const [desc, setDesc] = useState('')
  const [open, setOpen] = useState(false)

  return (
    <div className='my-12'>
      <h1 className="mb-8 text-neutral-600 text-center text-base font-semibold">Comments</h1>
      {isSignedIn ? (
        <div className="flex items-center justify-between gap-8">
          <textarea 
          placeholder='Write a comment...' 
          onChange={(e) => setDesc(e.target.value)}
          className='p-2 w-full border-2 rounded-md border-gray-600 focus:border-gray-600 active:border-gray-600'/>
        </div>
      ) : (
        <Link href='/login'>Login to write a comment</Link>
      )}
      <div className="mt-12">
        {/* {isLoading ?
          <Loading/> : data?} */}
          <div className='mb-12'>
            <div className='flex flex-col '>
              <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
                <Image
                  src="/images/image.png"
                  alt="alternative"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                  />
                  <div className="flex items-center gap-1 flex-2 md:flex-col">
                    <span className="font-medium">dawit teklay</span>
                    <span className="text-sm">20-10-2023</span>
                  </div>
                  <p className="text-sm font-light flex-1 md:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                    iusto, dicta doloribus perspiciatis.
                  </p>
              </div>
               <div className='ml-6 mb-4 md:ml-16'>
                <div className='cursor-pointer font-semibold mb-4' onClick={() => setOpen(!open)}>1 reply</div>
                {open && (
                  <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
                  <Image
                    src="/images/image.png"
                    alt="alternative"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    />
                    <div className="flex items-center gap-1 flex-2 md:flex-col">
                      <span className="font-medium">dawit teklay</span>
                      <span className="text-sm">20-10-2023</span>
                    </div>
                    <p className="text-sm font-light flex-1 md:text-base">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                      Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                      iusto, dicta doloribus perspiciatis.
                    </p>
                </div>
                )}
                {/* <Link className=''>1 reply</Link>   */}
               </div>
            </div>

            <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
              <Image
                src="/images/image.png"
                alt="alternative"
                width={50}
                height={50}
                className="rounded-full object-cover"
                />
                <div className="flex items-center gap-1 flex-2 md:flex-col">
                  <span className="font-medium">dawit teklay</span>
                  <span className="text-sm">20-10-2023</span>
                </div>
                <p className="text-sm font-light flex-1 md:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                  iusto, dicta doloribus perspiciatis.
                </p>
            </div>

            <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
              <Image
                src="/images/image.png"
                alt="alternative"
                width={50}
                height={50}
                className="rounded-full object-cover"
                />
                <div className="flex items-center gap-1 flex-2 md:flex-col">
                  <span className="font-medium">dawit teklay</span>
                  <span className="text-sm">20-10-2023</span>
                </div>
                <p className="text-sm font-light flex-1 md:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                  iusto, dicta doloribus perspiciatis.
                </p>
            </div>

            <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
              <Image
                src="/images/image.png"
                alt="alternative"
                width={50}
                height={50}
                className="rounded-full object-cover"
                />
                <div className="flex items-center gap-1 flex-2 md:flex-col">
                  <span className="font-medium">dawit teklay</span>
                  <span className="text-sm">20-10-2023</span>
                </div>
                <p className="text-sm font-light flex-1 md:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                  iusto, dicta doloribus perspiciatis.
                </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Comments