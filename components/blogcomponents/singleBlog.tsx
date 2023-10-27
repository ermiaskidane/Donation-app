"use client"

import { Post, User } from '@prisma/client'
import { format, parseISO } from "date-fns";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import Blogcomponent from './Blogcomponent'
import toast from 'react-hot-toast';
import Comments from './comments';
import { BlogData } from '@/type';

interface blogProps {
  updatedPost: Post,
  user: User,
}
interface SingleBlogprops {
  slug: string,
  blogs: BlogData,
  blog: blogProps
}


const SingleBlog = ({
  slug,
  blogs,
  blog
}: SingleBlogprops) => {


// console.log("ZZZZZZZZZZZZZZZZZZzz", slug)
// console.log("ZZZZZZZZZZZZZZZZZZzz", blogs)
// console.log("ZZZZZZZZZZZZZZZZZZzz", blog)
  
  const sanitizedData = (): { __html: string } => {
    if (!blog.updatedPost.desc) {
      return { __html: '' }; // Handle empty input
    }
    return {__html: DOMPurify.sanitize(blog.updatedPost.desc)}
  }
  
  return (
    <section className="w-full flex flex-col items-center px-8 pt-8 pb-8 md:px-20 md:pt-20">
        <article className="flex flex-col my-4">
        
        <Link href="#" className="hover:opacity-75">
          {blog?.updatedPost.img && (
              <Image src={blog.updatedPost.img}
                width={192}
                height={50} 
                alt="magees"
                className='!w-11/12'/>
          )}
        </Link>
        <div className="bg-white flex flex-col justify-start p-2 md:p-4">
            <Link href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{blog?.updatedPost.catSlug}</Link>
            <Link href="#" className="text-3xl font-bold hover:text-gray-700 pb-4 capitalize">{blog?.updatedPost.title}</Link>
            {blog?.updatedPost.createdAt && (
              <p className="text-sm pb-3">
              By <Link href="#" className="font-semibold hover:text-gray-800">{blog?.user.name}</Link>, {format(blog.updatedPost?.createdAt, 'MMMM do, yyyy')}
          </p>
            )}

        {blog?.updatedPost.desc && (
          <div className="pb-6" dangerouslySetInnerHTML={sanitizedData()}/> 
        )}
            
        </div>
      </article>
      {/* to match with fetch time of the data I choose to display once
      the desc property is fetched */}
      {blog?.updatedPost.desc && (
      <Comments postSlug={slug}/>
      )}
      <Blogcomponent Blogs={blogs}  blogRoute={false}/>
    </section>
  )
}

export default SingleBlog