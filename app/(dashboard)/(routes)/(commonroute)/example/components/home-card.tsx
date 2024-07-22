"use client";

import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import React, { useState } from 'react'

const HomeCard = () => {
  const [activeTab, setActiveTab] = useState('Welcome');
  const tabs = ['Welcome', 'Members', 'Feed', 'Courses', 'Events', 'Live', 'Chat', 'Analytics'];
  // const tabsImg = ['member-table', 'chart', 'article', 'blogs', 'communities', 'expense-detail', 'yearly-expense', 'summary-expense', "members", "services"];
  return (
    <>
      <div className="mt-12 md:mt-16 max-w-4xl mx-auto bg-teal-500 bg-opacity-80 rounded-full p-2 overflow-x-auto hide-scrollbar">
              <nav className="">
                <ul className="flex flex-nowrap justify-between min-w-max px-2">
                  {tabs.map((tab) => (
                      <li 
                          key={tab}
                          className={`text-white px-4 py-3 cursor-pointer rounded-full text-sm whitespace-nowrap ${activeTab === tab ? 'bg-teal-500' : ''}`}
                          onClick={() => setActiveTab(tab)}
                      >
                          {tab}
                      </li>
                  ))}
                </ul>
              </nav>
          </div>
          <div className="mt-8 md:mt-10 rounded-lg overflow-hidden shadow-lg">
              {tabs.map((tab) => (
                <div key={tab} className={activeTab === tab ? 'block' : 'hidden'}> 
                  <AspectRatio ratio={16 / 9} >
                    <Image
                        // src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        // src={`/images/${tab}.png`}
                        src="/images/img-home.jpg"
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                      />
                        {/* <img 
                            src="https://placehold.co/1200x800/png?text=Livewell+Interface+-+{tab}" 
                            alt={`Livewell platform interface showing ${tab} page`}
                            className="w-full h-auto"
                        /> */}
                    </AspectRatio> 
                  </div>  
              ))}
          </div>
    </>
  )
}

export default HomeCard