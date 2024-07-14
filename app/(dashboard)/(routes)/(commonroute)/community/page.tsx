
import { Metadata } from 'next';
import React from 'react'
import CommunityCards from './components/communityCards';
import { CommunityHeading } from './components/communityHeading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { auth } from '@clerk/nextjs/server';
import { PaginationDemo } from './components/pagination';
// import CommonCard from '@/lib/commonCard';

interface CommunityProps {
  searchParams: {
    search?: string;
    page?: string;
  }
}

export const metadata: Metadata = {
  title: "Community",
};
 
const Community = async({searchParams}: CommunityProps) => {

  const {page, search} = searchParams;


  const SERVER_PER_PAGE = 2
  // Provide a default value for page if it's null
  const pageValue = page ? parseInt(page) : 1;

  const server = await db.server.findMany({
    take: SERVER_PER_PAGE,
    skip: SERVER_PER_PAGE * (pageValue - 1),
    where: {
      name: { contains: search ? search : '' },
    },
    include: {
      members: true,
    }
  })
  const total = await db.server.count({})
  
  return (
    <section className="p-8">
      <CommunityHeading search={search}/>
      {/* <Separator className="my-8" /> */}
      <CommunityCards data={server} />
      <div className='my-8'>
        <PaginationDemo page={pageValue} totalPages={total/2} search=''/>
      </div>
    </section>
  )
}

export default Community