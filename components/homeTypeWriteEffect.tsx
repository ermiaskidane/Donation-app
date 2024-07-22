"use client"
import React from 'react'

import Typewriter from 'typewriter-effect';

const HomeTypeWriteEffect = () => {
  return (
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-300">
    <Typewriter
      options={{
        strings: ["Memberships", "Events", "Article", "Income", "Expenses" ],
          // strings: ['For god. For love. For Life', "For god. For love. For Life"],
          autoStart: true,
          loop: true,
        }}
    />
     </div> 
  )
}

export default HomeTypeWriteEffect