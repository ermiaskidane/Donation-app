import Blogcomponent from '@/components/Blogcomponent'
import Event from '@/components/Event'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { db } from '@/lib/db'
import Image from 'next/image'
import React from 'react'

const  HomePage = async() => {

  const categories = await db.category.findMany()


  console.log("££££££££££££££££££", categories)
  return (
    <div className="flex flex-col " >
      <div className="h-screen w-full z-5 bg-[url('/images/img-home.jpg')]">
      {/* <Image 
      className="object-cover mt-16 z-5"
      alt="Avatar"
      // width="700"
      // height="600"
      fill={true} 
      src='/images/img-home.jpg'
      sizes="(max-width: 768px) 100vw"
    /> */}

      <div className="flex flex-col justify-center items-center h-full ">
        <h3 className='flex flex-col justify-center text-[40px] capitalize font-medium md:block md:font-semibold md:text-[50px]'>Church of <span className="text-[35px] md:text-[50px]">st. Micheal</span></h3>
        <p className='text-md md:text-2xl '>For god. For love. For Life</p>
      </div>
    </div>

    <div className="flex flex-col items-center space-y-8 p-20 md:flex-row md:space-x-8 md:space-y-0">
      <Event/>
    </div>
    <Blogcomponent categories={categories}/>
    </div>
  )
}

export default HomePage