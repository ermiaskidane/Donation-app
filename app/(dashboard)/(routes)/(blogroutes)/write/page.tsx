import WriteBlog from '@/components/blogcomponents/writeBlog'
import { db } from '@/lib/db'
import React, { useState } from 'react'

const WritePage = async() =>{

  const categories = await db.category.findMany()
  return (
    <div className='m-4'>
      <WriteBlog categories={categories}/>
    </div>
  )
}

export default WritePage