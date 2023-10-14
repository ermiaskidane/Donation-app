import { useRouter } from 'next/navigation'
import React from 'react'

interface paginationProps {
  page: number,
  hasPrev: boolean,
  hasNext: boolean
}

const Pagination = ({
  page, hasPrev, hasNext
}: paginationProps) => {

  const router = useRouter()
  return (
    <div className="flex justify-between my-8">
      <button
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
        className="w-24 border-none p-4 bg-rose-500 text-white pointer disabled:cursor-not-allowed disabled:bg-rose-300">
        Previous
      </button>
      <button 
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
        className="w-24 border-none p-4 bg-rose-500 text-white pointer disabled:cursor-not-allowed disabled:bg-rose-300">
        Next
      </button>
    </div>
  )
}

export default Pagination