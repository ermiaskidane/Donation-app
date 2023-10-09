"use client"

import { Category } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'
import 'react-quill/dist/quill.bubble.css'
import ReactQuill from 'react-quill'

interface WriteBlogProps {
  categories?: Category[]
}

const WriteBlog = ({
  categories
}: WriteBlogProps) => {

  const [open, setOpen] = useState<Boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [value, setValue] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  const [catSlug, setCatSlug] = useState<String>("")

  return (
    <div className='relative flex flex-col'>
      <input 
        type="text" 
        placeholder='Title' 
        className='p-12 text-6xl border-none outline-none bg-transparent text-red'
        onChange={(e) => setTitle(e.target.value)}
       />
       <select 
        className='mb-12 py-2 px-5 w-max'
        onChange={(e) => setCatSlug(e.target.value)}
        value={catSlug}
       >
       {categories?.map((cat, i) =>  (
          <option key={i} value={cat.slug}>{cat?.title}</option>
       ))}
       </select>

       <div className="flex gap-5 h-full relative">
          <button 
          className="w-9 h-9 rounded-full 
          bg-transparent border-2 border-solid 
          border-gray-400 flex items-center 
          justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
          >
            <Image src='/images/plus.png' alt='' width={16} height={16} />
          </button>

          {open && (
            <div className="flex gap-5 absolute bg-transparent w-screen z-50 left-12">
              <input 
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className='hidden' />

                <button className='w-9 h-9 rounded-full 
                  bg-transparent border-2 border-solid 
                  flex items-center justify-center cursor-pointer 
                  border-lime-500'>
                    <label htmlFor='image'>
                      <Image src='/images/image.png' alt='' width={16} height={16} />
                    </label>
                  </button>

                  <button className='w-9 h-9 rounded-full 
                  bg-transparent border-2 border-solid 
                  flex items-center justify-center cursor-pointer 
                  border-lime-500'>
                      <Image src='/images/external.png' alt='' width={16} height={16} />
                  </button>

                  <button className='w-9 h-9 rounded-full 
                  bg-transparent border-2 border-solid 
                  flex items-center justify-center cursor-pointer 
                  border-lime-500'>
                      <Image src='/images/video.png' alt='' width={16} height={16} />
                  </button>
            </div>
          )}

          <ReactQuill 
            className='w-screen'
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Write your Blog..."/>
       </div>
       <button className="absolute top-0 right-0 py-2 px-5 border-none bg-green-600 text-white cursor-pointer rounded-2xl">
        Publish
       </button>
    </div>
  )
}

export default WriteBlog