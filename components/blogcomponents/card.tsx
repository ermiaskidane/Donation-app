import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DOMPurify from 'dompurify';
import { string } from 'zod'
import { usePathname } from 'next/navigation';
// import { loadBase64Image } from '@/lib/load-base64';

interface cardProps {
  serverId?: string
  blog: any,
}


const Card = ({
  serverId,
  blog,
}: cardProps) => {

  const pathName = usePathname()

  const segment = pathName.split("/")
  // const serverId = segment[2]

  const wpm = 225;
  const word = blog?.desc.trim().split(/\s+/).length
  const readTime = Math.ceil(word / wpm);

  // const { base64, img } = await loadBase64Image(blog.img)

  const sanitizedData = (): { __html: string } => {
    if (!blog.desc) {
      return { __html: '' }; // Handle empty input
    }
    const trimDesc: string = blog.desc.substring(0, 100);
    return { __html: DOMPurify.sanitize(trimDesc) };
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-xl">
        {blog.img && (
          <Image 
            src={blog.img}
            // {...img}
            // placeholder='blur'
            alt="art cover"
            // blurDataURL={base64} 
            loading="lazy" 
            width="1000" 
            height="667" 
            className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
            />
        )}
      </div>
      <div className="mt-6 relative">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {blog.title}
        </h3>
        <p className="mt-6 mb-8 text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={sanitizedData()}/>
        {/* set conditional link to view the blog if user is not in community   */}
        <Link className=" flex justify-between " href={serverId ? `/server/${serverId}/blog/${blog.slug}`: `/blog/${blog.slug}`}>
          <span className="text-info dark:text-blue-300">Read more</span>
          <span className='text-info'>{readTime} minute</span>
        </Link>
      </div>
    </>
  )
}

export default Card