"use client"

import React, { useEffect, useState } from 'react'
import Card from '@/components/blogcomponents/card'
// import Pagination from './Pagination'
import toast from 'react-hot-toast';
import { Post } from '@prisma/client';
import { BlogData, Server } from '@/type';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '@/hooks/useModalStore';
// import { ServerModal } from '@/components/Modal/server-modal';
import { ExpenseModal } from '@/components/Modal/server-modal';

interface cardListprops {
  // page: number,
  data: Server[],
  // cat:string | null
}

const CommunityCards = ({
  data,
  // page,
  // cat
}: cardListprops) => {

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const { onOpen } = useModal();

  // const POST_PER_PAGE = 3

  // const hasPrev = POST_PER_PAGE * (page - 1) > 0
  // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count
  const onSubmit = async (data: any) => {
    console.log(data)
    // try {
    //   setLoading(true)
    //   await axios.post(`/api/expense/${year}`, data)

    //   router.refresh();
    //   router.push('/expense');
    //   toast.success("expense has been created")
    // } catch(error: any){
    //   toast.error('Something went wrong.');
    // } finally{
    //   setLoading(false);
    //   setOpen(!open);
    // }
  }

  return (
    <>
    {/* TODO: change this expenseModal to addMemeber */}
    <ExpenseModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.map((server) => (
        <div key={server.id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          {/* <Card server={server}/> */}
          <div className="relative overflow-hidden rounded-xl">
        {server.imageUrl && (
          <Image src={server.imageUrl}
          alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
        )}
      </div>
      <div className="mt-6 flex justify-between align-middle">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {server.name}
        </h3>
        <button onClick={() => setOpen(true)}>Add Client</button>
        {/* <p className=" text-gray-600 dark:text-gray-300">Add Client</p> */}
        {/* <Link className=" flex justify-between " href={`/server/${server.name}`}>
          <span className="text-info dark:text-blue-300">Read more</span>
        </Link> */}
      </div>
          {/* <h1>{server.name}</h1> */}
      </div>
      ))}
    </div>
    {/* <Pagination cat={cat} page={page} hasPrev={hasPrev} hasNext={hasNext}/> */}
 </>
  )
}

export default CommunityCards