
import { Metadata } from 'next';
import React from 'react'
import CommunityCards from './components/communityCards';
import { CommunityHeading } from './components/communityHeading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
// import CommonCard from '@/lib/commonCard';


export const metadata: Metadata = {
  title: "Community",
};
 
const Community = async() => {

  const server = await db.server.findMany({
    include: {
      members: true,
    }
  })
  
  return (
    <section className="p-8">
      <CommunityHeading/>
      <Separator className="my-8" />
      <CommunityCards data={server} />
      {/* <CommunityCards data={server} user={currentuser} /> */}
    </section>
  )
}

export default Community