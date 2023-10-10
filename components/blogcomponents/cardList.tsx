
import React from 'react'
import Card from './card'

interface cardListprops {
  page: number,
  cat?: string
}

const getData = async (page: number, cat: string) => {
  const res = await fetch(
    `http://localhost:3000/api/blog?page=${page}&cat=${cat || ''}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const CardList = async ({
  page, cat
}: cardListprops) => {
  const { posts, count } = await getData(page, cat)
  return (
    <div>
      cardList
      <Card/>
    </div>
  )
}

export default CardList