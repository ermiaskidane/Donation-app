import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import Event from '@/components/Event'
import HomeTypeWriteEffect from '@/components/homeTypeWriteEffect'
import { db } from '@/lib/db'
// import { initialUser } from '@/lib/initial-user'
import React from 'react'

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams
}

const  HomePage = async({searchParams}: BlogPageProps) => {

  // await initialUser()
  const categories = await db.category.findMany()
  const blogList = await getBlog(searchParams)

  // console.log("££££££££££££££££££", categories)
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
          <h3 className='flex flex-col justify-center text-slate-100 text-4xl w-full text-center sm:text-5xl md:text-6xl lg:text-7xl  capitalize font-medium md:block md:font-bold'>Church of <span className="sm:text-5xl md:text-6xl lg:text-7xl">st. Micheal</span></h3>
          <div className='text-xl sm:text-3xl md:text-4xl lg:text-5xl space-y-5 font-bold   '>
            <HomeTypeWriteEffect/>
          </div>
        </div>
      </div>

      

    <div className="flex flex-col items-center space-y-8 py-20 md:px-4 xl:px-6 md:flex-row md:space-x-8 md:space-y-0">
      <Event/>
    </div>
      <Blogcomponent Blogs={blogList} categories={categories} blogRoute={true} />
    </div>
  )
}

export default HomePage