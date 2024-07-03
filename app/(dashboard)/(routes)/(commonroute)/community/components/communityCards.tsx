"use client"

import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Post, Server, User } from '@prisma/client';
import Card from '@/components/blogcomponents/card'
// import Pagination from './Pagination'
import { useModal } from '@/hooks/useModalStore';
import { ServerModal } from '@/components/Modal/server-modal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MemberModal } from '@/components/Modal/member-modal';
import { ServerToggle } from '@/components/serverToggle';

interface CommunityCardsprops {
  // page: number,
  // user: User | null
  data: Server[],
  // cat:string | null
}

const CommunityCards = ({
  data,
  // user
  // page,
  // cat
}: CommunityCardsprops) => {

  const [openMember, setOpenMember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverId, setServerId] = useState<string>();
  const [modalKey, setModalKey] = useState<number>(0);

  const router = useRouter()
  // const { onOpen } = useModal();

  // const POST_PER_PAGE = 3

  // const hasPrev = POST_PER_PAGE * (page - 1) > 0
  // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < data.count

  const OpenModal = (id: string) => {
    if (id) {
      setOpenMember(true);
      setServerId(id);
    }
  }

  // const onSubmit = async (data: any) => {
  //   console.log("data", data)
    // try {
    //   setLoading(true)
    //   await axios.post(`/api/community/${serverId}`, data)

    //   // router.refresh();
    //   // soft refresh (reset the data)
    //   setModalKey(prevKey => prevKey + 1);
    //   router.push('/community');
    //   toast.success("client added to community")
    // } catch(error: any){
    //   toast.error('Something went wrong.');
    // } finally{
    //   setLoading(false);
    //   setOpenMember(false);
    // }
  // }

  return (
    <>
      {/* <ServerModal
        key={modalKey} 
        isOpen={openMember}
        onClose={() => setOpenMember(false)}
        onSubmit={onSubmit}
        loading={loading}
      /> */}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.map((server) => (
        <div key={server.id} className="group p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
            {server.imageUrl && (
              <>
                <div className='relative overflow-hidden rounded-xl'>
                  <Link href={`/server/${server.id}/members`} className="">
                    <Image src={server.imageUrl}
                    alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"/>
                  </Link> 
                </div>
                <div className="mt-6 flex justify-between align-middle">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {server.name}
                  </h3>
                  {/* 
                    due to the libs/currentProfile file function structure I had to add "!user" 
                    eventthough the aim is to display only user with ADMIN type
                  */}
                  {/* {!user || user.role === "ADMIN"  && (
                    <ServerToggle serverId={server.id} userRole={user}/>
                  )} */}
                </div>
              </>
            )}
          </div>
      ))}
    </div>
    </>
  )
}

export default CommunityCards