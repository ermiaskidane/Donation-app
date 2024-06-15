"use client"

import React, {useState} from 'react'
import Image from 'next/image'


function Sliders() {

  const images = ['https://source.unsplash.com/collection/1346951/800x800?sig=1',
  'https://source.unsplash.com/collection/1346951/800x800?sig=3',
  'https://source.unsplash.com/collection/1346951/800x800?sig=4',
  'https://source.unsplash.com/collection/1346951/800x800?sig=5',
  'https://source.unsplash.com/collection/1346951/800x800?sig=6',
  'https://source.unsplash.com/collection/1346951/800x800?sig=7',
  'https://source.unsplash.com/collection/1346951/800x800?sig=8',
  'https://source.unsplash.com/collection/1346951/800x800?sig=9'
]

  return (
  <div className="w-full bg-white pt-12 overflow-hidden">
        <div
          id="move"
          className="relative w-full flex items-center  md:visible md:pb-12"
        >
            {
              images?.map((item, index) => (
                // <div className='scroll-pl-6 snap-x'>
                <Image
                key={index}
                src={item}
                alt="avatar"
                width={300}
                height={700}
                className="w-1/2 md:w-1/4 hover:opacity-75 "
              />
              // </div>
              ))
            }  
        </div>
      </div>
  )
}

export default Sliders