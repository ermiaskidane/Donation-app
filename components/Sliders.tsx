"use client"

import React from 'react'
import Image from 'next/image'


function Sliders() {

  const increment = () => {
    console.log("increment")
  }

  const decrement = () => {
    console.log("decrement")
  }

  const images = ['https://source.unsplash.com/collection/1346951/800x800?sig=1',
  'https://source.unsplash.com/collection/1346951/800x800?sig=2',
  'https://source.unsplash.com/collection/1346951/800x800?sig=3',
  'https://source.unsplash.com/collection/1346951/800x800?sig=4',
  'https://source.unsplash.com/collection/1346951/800x800?sig=5',
  'https://source.unsplash.com/collection/1346951/800x800?sig=6',
  'https://source.unsplash.com/collection/1346951/800x800?sig=7',
  'https://source.unsplash.com/collection/1346951/800x800?sig=8',
  'https://source.unsplash.com/collection/1346951/800x800?sig=9'
]

  return (
  <div className="w-full bg-white pt-12">
        <div
            className="relative w-full flex items-center  md:visible md:pb-12"
            x-data="getCarouselData()"
        >
            <button
                className="absolute bg-sky-600 hover:bg-sky-500 text-white text-xl font-bold hover:shadow rounded-full ml-12 w-10 h-10 md:w-16 md:h-16 md:text-2xl"
                onClick={decrement}>
                &#8592;
            </button>
            {
              images?.map((item, index) => (
                // <div className='scroll-pl-6 snap-x'>
                <Image
                key={index}
                src={item}
                alt="avatar"
                width={300}
                height={700}
                className="w-1/2 md:w-1/4 hover:opacity-75"
              />
              // </div>
              ))
            }  
            <button
                className="absolute right-0 bg-sky-600 hover:bg-sky-500 text-white text-xl font-bold hover:shadow rounded-full mr-12  w-10 h-10 md:w-16 md:h-16 md:text-2xl"
                onClick={increment}>
                &#8594;
            </button>
        </div>
      </div>
  )
}

export default Sliders