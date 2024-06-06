import getBlog, { IParams } from '@/app/actions/getBlogs'
import Blogcomponent from '@/components/blogcomponents/Blogcomponent'
import CardList from '@/components/blogcomponents/cardList';
// import CommonCard from '@/lib/commonCard';
import { Metadata } from 'next';
import React from 'react'
import CommunityCards from './components/communityCards';
import { Server } from '@/type';

interface BlogPageProps {
  // searchParams: string
  searchParams: IParams
}

const server = [
  {
    id: "1",
    name: "community 1",
    imageUrl: "/images/Screenshot-245.png",
    inviteCode: "123",
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "2",
    name: "community 2",
    imageUrl: "/images/Screenshot-245.png",
    inviteCode: "123",
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "3",
    name: "community 3",
    imageUrl: "/images/Screenshot-245.png",
    inviteCode: "123",
    createdAt: "",
    updatedAt: ""
  },
  {
    id: "4",
    name: "community 4",
    imageUrl: "/images/Screenshot-245.png",
    inviteCode: "123",
    createdAt: "",
    updatedAt: ""
  }
]

export const metadata: Metadata = {
  title: "Blog",
};
 
const Community = async({searchParams}: BlogPageProps) => {

  const blogList = await getBlog(searchParams)
  
  return (
    <section className=" flex flex-col">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">Communitys</h2>
        <p className="lg:mx-auto lg:w-6/12 text-gray-600 dark:text-gray-300">
          All lists of Community
        </p>
      </div>
      <CommunityCards data={server} />
    </section>
  )
}

export default Community