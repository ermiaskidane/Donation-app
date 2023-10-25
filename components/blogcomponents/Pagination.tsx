import { useRouter } from 'next/navigation'
import React from 'react'

interface paginationProps {
  page: number,
  hasPrev: boolean,
  hasNext: boolean,
  cat?: string
}

const Pagination = ({
  page, hasPrev, hasNext, cat
}: paginationProps) => {

  const router = useRouter()
  // cz cat=null consider the api as a string we had to use this terinary
  // to make empty string
  const cate = cat ? cat : ""

  return (
    <div className="flex justify-between my-8">
      <button
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}&cat=${cate}`)}
        className="w-24 border-none p-4 bg-blue-600 text-white pointer disabled:cursor-not-allowed disabled:bg-blue-300">
        Previous
      </button>
      <button 
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}&cat=${cate}`)}
        className="w-24 border-none p-4 bg-blue-600 text-white pointer disabled:cursor-not-allowed disabled:bg-blue-300">
        Next
      </button>
    </div>
  )
}

export default Pagination