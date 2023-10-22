"use client"
import React from 'react'

import Typewriter from 'typewriter-effect';

const HomeTypeWriteEffect = () => {
  return (
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-600">
    <Typewriter
      options={{
          strings: ['For god. For love. For Life', "For god. For love. For Life"],
          autoStart: true,
          loop: true,
        }}
    />
    </div>
  )
}

export default HomeTypeWriteEffect