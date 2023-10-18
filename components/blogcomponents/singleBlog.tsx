"use client"

import { Post } from '@prisma/client'
import { format, parseISO } from "date-fns";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
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
  console.log("£££££££££££££££££££££33", data)
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
          <Link href="#" className="pb-6">
          <div dangerouslySetInnerHTML={{ __html: data?.updatedPost.desc }}/>
          <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, deserunt eos. Quam consectetur obcaecati corrupti possimus
          adipisci quo dignissimos pariatur, similique repellendus voluptates quasi excepturi delectus nisi a consequuntur voluptatum?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos rem alias quia architecto quod autem aliquid beatae repellat 
          soluta laborum perspiciatis quae, praesentium corrupti tempora tempore aspernatur magni. Porro quisquam in modi, odit distinctio 
          facilis sunt excepturi dolore delectus veniam doloribus cupiditate temporibus voluptatum nostrum voluptatem repellendus eveniet, 
          corporis omnis! Impedit incidunt ullam itaque reprehenderit error maiores sit beatae accusantium placeat nemo in doloribus commodi 
          asperiores deleniti eius quidem, perferendis distinctio veniam tenetur? Ab molestias nobis placeat, repellendus molestiae est. 
          Aut exercitationem, consectetur ab quis ut officia, corporis minus quo assumenda nam cum natus nostrum non doloremque aliquam dicta quidem.

          <br/>
          <br/>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis dolore eveniet pariatur nobis distinctio voluptate magnam consectetur 
          assumenda. Voluptas unde a maiores odio. Commodi, cumque totam. Quibusdam asperiores a facere iste aliquam atque numquam est impedit molestiae 
          sunt ex exercitationem natus harum, laudantium voluptas unde alias error recusandae fugiat qui labore velit! Voluptatem totam harum tenetur repellat! 
          Illo, quisquam repudiandae ab, quasi ipsum, eius minima incidunt nostrum quaerat laborum soluta aliquam unde aspernatur a. Aut magni voluptate iusto 
          quo nisi atque, aspernatur quia! Eveniet porro tenetur, consectetur veritatis, fugiat hic nemo cum praesentium officia modi excepturi veniam cupiditate!
            Quisquam.
        </Link> 
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