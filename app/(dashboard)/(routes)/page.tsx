import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className="h-screen w-full z-5 bg-[url('/images/img-home.jpg')]" >
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
      <h3 className='text-[50px] capitalize font-bold'>Church of manchester</h3>
      <p className='text-2xl '>For god. For love. For Life</p>
    </div>

    <div className="flex flex-col items-center space-y-8 p-20 md:flex-row md:space-x-8 md:space-y-0">
      <Card className="w-full md:w-1/3 ">
        <CardHeader className="flex items-center justify-center font-bold capitalize">
          preach events
        </CardHeader>
        <CardContent>
          <Image 
            className="object-cover z-5"
            alt="Avatar"
            width="700"
            height="700" 
            src='/images/img-home.jpg'
            sizes="(max-width: 768px) 100vw"
          />
        </CardContent>
      </Card>
      <Card className="w-full md:w-1/3  ">
        <CardHeader className="flex items-center justify-center font-bold capitalize">
          preach events
        </CardHeader>
        <CardContent>
          <Image 
            className="object-cover z-5"
            alt="Avatar"
            width="700"
            height="700" 
            src='/images/img-home.jpg'
            sizes="(max-width: 768px) 100vw"
          />
        </CardContent>
      </Card>
      <Card className="w-full md:w-1/3  ">
        <CardHeader className="flex items-center justify-center font-bold capitalize">
          preach events
        </CardHeader>
        <CardContent>
          <Image 
            className="object-cover z-5"
            alt="Avatar"
            width="700"
            height="700" 
            src='/images/img-home.jpg'
            sizes="(max-width: 768px) 100vw"
          />
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default page