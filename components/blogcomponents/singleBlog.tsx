"use client"

import { Post } from '@prisma/client'
import { format, parseISO } from "date-fns";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import Blogcomponent from './Blogcomponent'
import toast from 'react-hot-toast';
import Comments from './comments';

interface SingleBlogprops {
  slug: string
}

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const SingleBlog = ({
  slug
}: SingleBlogprops) => {

  const [data, setData] = useState<any>({ updatedPost: {}, user: {} });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (error) {
        // Handle errors
        toast.error("something went wrong");
      }
    };

    fetchData();
  }, [slug]);
 

  // const dt = data.updatedPost ? (format(parseISO(data.updatedPost?.createdAt), 'MMMM do, yyyy')) : ""
  // const dt = format(parseISO(data.updatedPost?.createdAt), 'MMMM do, yyyy')
  
  const sanitizedData = (): { __html: string } => ({
    __html: DOMPurify.sanitize(data.updatedPost.desc)
  })
  
  return (
    <section className="w-full flex flex-col items-center px-8 pt-8 pb-8 md:px-20 md:pt-20">
        <article className="flex flex-col my-4">
        
        <Link href="#" className="hover:opacity-75">
          {data?.updatedPost.img && (
              <Image src={data.updatedPost.img}
                width={192}
                height={50} 
                alt="magees"
                className='!w-11/12'/>
          )}
        </Link>
        <div className="bg-white flex flex-col justify-start p-2 md:p-4">
            <Link href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">{data?.updatedPost.catSlug}</Link>
            <Link href="#" className="text-3xl font-bold hover:text-gray-700 pb-4 capitalize">{data?.updatedPost.title}</Link>
            {data?.updatedPost.createdAt && (
              <p className="text-sm pb-3">
              By <Link href="#" className="font-semibold hover:text-gray-800">{data?.user.name}</Link>, {format(parseISO(data.updatedPost?.createdAt), 'MMMM do, yyyy')}
          </p>
            )}

        {data?.updatedPost.desc && (
          <div className="pb-6" dangerouslySetInnerHTML={sanitizedData()}/> 
        )}
            
        </div>
      </article>
      {/* to match with fetch time of the data I choose to display once
      the desc property is fetched */}
      {data?.updatedPost.desc && (
      <Comments postSlug={slug}/>
      )}
      <Blogcomponent  blogRoute={false}/>
    </section>
  )
}

export default SingleBlog