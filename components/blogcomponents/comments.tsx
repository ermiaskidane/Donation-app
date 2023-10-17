'use client'

import Loading from '@/app/loading';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { comment } from '@/lib/data';
import { format, parseISO } from 'date-fns'

const Comments = () =>{
  const { isSignedIn } = useAuth();
  const [desc, setDesc] = useState('')
  const [open, setOpen] = useState(false)

 // Create an array to track the open/closed state of each comment
 const [commentOpen, setCommentOpen] = useState(new Array(comment.length).fill(false));

 console.log("Commmmmmmm", commentOpen)
 const getOpenComment = (index: number) => {
   // Create a copy of the commentOpen array to avoid mutating state directly
   const newCommentOpen = [...commentOpen];

   // Toggle the open/closed state of the selected comment
   newCommentOpen[index] = !newCommentOpen[index];
   
   // Update the state with the new array
   setCommentOpen(newCommentOpen);
 };

  return (
    <div className='w-full my-12'>
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
              {comment.map((com, index) => (
                <>
                  <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center' key={com.id}>
                    <Image
                      src="/images/image.png"
                      alt="alternative"
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                      />
                      <div className="flex items-center gap-1 flex-2 md:flex-col">
                        <span className="font-medium">{com.userEmail}</span>
                        <span className="text-sm">{format(parseISO(com.createdAt), 'MMMM do, yyyy')}</span>
                      </div>
                      <p className="text-sm font-light flex-1 md:text-base">
                        {com.description}
                      </p>
                  </div>
              
                  <div className='ml-6 mb-4 md:ml-16'>
                    <div className='cursor-pointer font-semibold mb-4' onClick={() => getOpenComment(com.id)}>{com.comments.length} {commentOpen[com.id] ? 'hide' : 'reply'}</div>
                    {commentOpen[com.id] && isSignedIn && (
                        <div className="flex items-center justify-between gap-8">
                          <textarea 
                          placeholder='Write a comment...' 
                          onChange={(e) => setDesc(e.target.value)}
                          className='mb-4 p-2 w-full border-2 rounded-md border-gray-600 focus:border-gray-600 active:border-gray-600'/>
                        </div>
                      )}
                    {com.comments.map((comt, index) => (
                      <>
                      {commentOpen[com.id] && (
                      <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
                        <Image
                          src="/images/image.png"
                          alt="alternative"
                          width={50}
                          height={50}
                          className="rounded-full object-cover"
                          />
                          <div className="flex items-center gap-1 flex-2 md:flex-col">
                            <span className="font-medium">{comt.userEmail}</span>
                            <span className="text-sm">{format(parseISO(comt.createdAt), 'MMMM do, yyyy')}</span>
                          </div>
                          <p className="text-sm font-light flex-1 md:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Reiciendis, tenetur quis! Necessitatibus pariatur a quo similique 
                            iusto, dicta doloribus perspiciatis.
                          </p>
                      </div>
                      )}
                      </>
                    ))}
                  </div>
                </>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Comments