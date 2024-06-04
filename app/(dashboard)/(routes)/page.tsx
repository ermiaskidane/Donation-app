import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import Event from '@/components/Event'
import HomeTypeWriteEffect from '@/components/homeTypeWriteEffect'
import { MacbookScroll } from '@/components/ui/macbook-scroll'
import { db } from '@/lib/db'
import React from 'react'

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams
}

const  HomePage = async({searchParams}: BlogPageProps) => {

  const categories = await db.category.findMany()
  const blogList = await getBlog(searchParams)


  return (
    <div className="flex flex-col " >
      <div className="h-screen w-full z-5 bg-[url('/images/img-home.jpg')] ">
{/*       <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        // title={
        //   <span>
        //     This Macbook is built with Tailwindcss. <br /> No kidding.
        //   </span>
        // }
        // badge={
        //   <Link href="https://peerlist.io/manuarora">
        //     <Badge className="h-10 w-10 transform -rotate-12" />
        //   </Link>
        // }
        src={`/linear.webp`}
        showGradient={false}
      />
    </div> */}

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
