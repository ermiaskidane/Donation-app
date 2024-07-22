import Event from '@/components/Event'
import HomeTypeWriteEffect from '@/components/homeTypeWriteEffect'
import { Button } from '@/components/ui/button'
import React from 'react'
import HomeCard from './components/home-card'
import { db } from '@/lib/db'
import getBlogs, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'

interface ExampleProps {
  // searchParams: string
  searchParams: IParams
}

const Example = async({searchParams}: ExampleProps) => {
  const categories = await db.category.findMany()
  const blogList = await getBlogs(searchParams)
  return (
      <div className="min-h-screen">
        <main className="mt-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-black text-6xl font-bold mb-6">
                  The community platform for <HomeTypeWriteEffect/>
              </h1>
              <p className="text-black text-xl mb-8">
                  What's possible when a paid membership, online courses, challenges, or events are powered by AI? Your community essentially runs itself.
              </p>
              <Button className="bg-teal-600 p-6 rounded-3xl hover:bg-teal-500 hover:text-black">
                  Get Started
              </Button>
          </div>

          <HomeCard/>

          <div className="flex flex-col items-center space-y-8 py-20 md:px-4 xl:px-6 md:flex-row md:space-x-8 md:space-y-0">
            <Event/>
          </div>

              <Blogcomponent Blogs={blogList} categories={categories} blogRoute={true} />
        </main>
      </div>
  )
}

export default Example