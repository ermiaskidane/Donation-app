import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='border-4 border-solid border-black/0.1 border-l-blue-400 rounded-full w-10 h-10 animate-spin'></div>
    </div>
  )
}

export default Loading