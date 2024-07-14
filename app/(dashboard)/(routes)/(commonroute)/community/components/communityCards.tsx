"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Server } from '@prisma/client';

interface CommunityCardsprops {
  data: Server[],
}

const CommunityCards = ({
  data,
}: CommunityCardsprops) => {
  return (
    <>
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