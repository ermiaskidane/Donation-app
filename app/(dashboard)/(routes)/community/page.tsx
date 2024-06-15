import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import CardList from '@/components/blogcomponents/cardList';
// import CommonCard from '@/lib/commonCard';
import { Metadata } from 'next';
import React from 'react'
import CommunityCards from './components/communityCards';
import { Button } from '@/components/ui/button';
import useUserRoleStore from '@/hooks/useUserRole';
import { CommunityHeading } from './components/communityHeading';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';


export const metadata: Metadata = {
  title: "Community",
};
 
const Community = async() => {

  const server = await db.server.findMany({
    // include: {
    //   members: true,
    // }
  })

  console.log("server", server)

  
  return (
    <section className="p-8">
      <CommunityHeading/>
      <Separator className="mb-8" />
      <CommunityCards data={server} />
    </section>
  )
}

export default Community