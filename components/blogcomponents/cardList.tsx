
import React, { useEffect, useState } from 'react'
import Card from './card'

interface cardListprops {
  page: number,
  cat?: string
}

const getData = async (page: number, cat: string | undefined) => {
  const res = await fetch(
    `http://localhost:3001/api/blog?page=${page}&cat=${cat || ''}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const CardList = ({
  page, cat
}: cardListprops) => {
  // const { posts, count } = await getData(page, cat)
  const [data, setData] = useState<any>({ posts: [], count: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(page, cat);
        setData(result);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, [page, cat]);

  console.log("@@@@@@@@@@@@@@@@LLLLLLLLLLLLLLLLL", data)
  return (
    <div>
      cardList
      <Card/>
    </div>
  )
}

export default CardList