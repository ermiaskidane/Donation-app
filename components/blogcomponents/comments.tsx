'use client'

import Loading from '@/app/loading';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr'
import React, { useState } from 'react'
import { comment } from '@/lib/data';
import { format, parseISO } from 'date-fns'
import { Comment, NestComment } from '@/type';

// import { Comment, NestComment, User } from '@prisma/client';

interface CommentProps {
  postSlug: string,
}
 
const fetcher = async (url: any) => {
  const res = await fetch(url)

  const data = await res.json()

  if(!res.ok){
    const error = new Error(data.message)
    throw error;
  }

  return data
}

const Comments = ({
  postSlug,
}: CommentProps) =>{
  const { isSignedIn, userId } = useAuth();
  const [desc, setDesc] = useState('')
  const [nestDesc, setNestDesc] = useState("")


  // swr make a continious request for any update of the data
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  )

 // Create an array to track the open/closed state of each comment
 const [commentOpen, setCommentOpen] = useState(new Array(data?.length).fill(false));

//  console.log("Commmmmmmm", data) 
 const getOpenComment = (index: number) => {
   // Create a copy of the commentOpen array to avoid mutating state directly
   const newCommentOpen = [...commentOpen];

   // Toggle the open/closed state of the selected comment
   newCommentOpen[index] = !newCommentOpen[index];
   
   // Update the state with the new array
   setCommentOpen(newCommentOpen);
 };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  await fetch("/api/comments", {
    method: "POST",
    body:JSON.stringify({desc, postSlug})
  })
  
  // mutate helps to display the comment after created
  mutate()
  setDesc('')
 }

 const handleNestedSubmit = async (event: React.FormEvent<HTMLFormElement>, id: string) => {
  event.preventDefault()
  await fetch(`/api/comments/${userId}?id=${id}`, {
    method: "POST",
    body:JSON.stringify({nestDesc})
  })

  // mutate helps to display the comment after created
  mutate()
  setNestDesc('')
 }

  return (
    <div className='w-full my-12 px-6 pt-6 pb-6 md:px-20 md:pt-20'>
      <h1 className="mb-8 text-neutral-600 text-center text-base font-semibold">Comments</h1>
        {isSignedIn ? (
          <form className="flex items-center justify-between gap-8" onSubmit={handleSubmit}>
            <textarea 
            placeholder='Write a comment...' 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className='p-2 w-full h-12 border-2 rounded-md border-gray-600 focus:border-gray-600 active:border-gray-600 md:h-16'/>
            <button
              type="submit"
              className='px-4 h-12 bg-blue-500 text-white font-bold border-0 rounded cursor-pointer md:h-16'
              >
              Send
            </button>
          </form>
        ) : (
          <Link href='/login'>Login to write a comment</Link>
        )}
      <div className="mt-12">
        <div className='mb-12'>
            <div className='flex flex-col '>
        {isLoading ?
          <Loading/> : data?.map((item: Comment & { NestComments: NestComment[] }, index: number) => (
              <div key={item.id}>
                <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center'>
                  <Image
                    src={item.user.imageUrl}
                    alt="alternative"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                    />
                    <div className="flex items-center gap-1 flex-2 md:flex-col">
                      <span className="font-medium">{item.user.name}</span>
                      <span className="text-sm">{format(parseISO(item.createdAt), 'MMMM do, yyyy')}</span>
                    </div>
                    <p className="text-sm font-light flex-1 md:text-base">
                      {item.desc}
                    </p>
                </div>
            
                <div className='ml-6 mb-4 md:ml-16'>
                  <div className='cursor-pointer font-semibold mb-4' onClick={() => getOpenComment(index)}>{item.NestComments.length} {commentOpen[index] ? 'hide' : 'reply'}</div>
                  {commentOpen[index] && isSignedIn && (
                      <form className="flex items-center justify-between gap-8" onSubmit={(e) => handleNestedSubmit(e, item.id )}>
                        <textarea 
                        placeholder='Write a comment...' 
                        value={nestDesc}
                        onChange={(e) => setNestDesc(e.target.value)}
                        className='mb-4 p-2 w-full h-12 border-2 rounded-md border-gray-600 focus:border-gray-600 active:border-gray-600 md:h-16'/>
                        <button type="submit" className='mb-4 px-4 h-12 bg-blue-500 text-white font-bold border-0 rounded cursor-pointer md:h-16'>
                          Send
                        </button>
                      </form>
                    )}
                  {item.NestComments.map((comt: NestComment, indexs: number) => (
                    <div key={indexs}>
                    {commentOpen[index] && (
                    <div className='flex flex-col items-start gap-4 mb-4 md:flex-row md:items-center' >
                      <Image
                        src={comt.user.imageUrl}
                        alt="alternative"
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                        />
                        <div className="flex items-center gap-1 flex-2 md:flex-col">
                          <span className="font-medium">{comt.user.name}</span>
                          <span className="text-sm">{format(parseISO(comt.createdAt), 'MMMM do, yyyy')}</span>
                        </div>
                        <p className="text-sm font-light flex-1 md:text-base">
                          {comt.desc}
                        </p>
                    </div>
                    )}
                    </div>
                  ))}
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments