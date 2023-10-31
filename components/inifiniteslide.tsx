'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './inifiniteslide.module.css'
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { Info } from '@prisma/client';

const getInfo = async ()  => {
  const res = await fetch(
    `http://localhost:3000/api/info`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed')
  }

  return res.json()
}

const InfiniteSlide = () => {
  const slider = useRef(null);

  const [info, setInfo] = useState<Info[]>([]);

  // console.log("99999999999999999999", info)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInfo();

        // let updatedNews = []

        // // Get the current date and time
        // const currentTime = new Date();

        // for (let i in result){

        //   const createdAt = new Date(result[i].createdAt);

        //   // Compare createdAt with the current time
        //   if (createdAt >= currentTime) {
        //     updatedNews.push(result[i]);
        //   }
        // }
        // setInfo(updatedNews);
        setInfo(result);
      } catch (error) {
        // Handle errors
        toast.error("something went wrong");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sliderRef = slider.current;
    const animation = gsap.to(sliderRef, {
      x: '-100%',
      ease: 'linear',
      duration: 20,
      repeat: -1,
      onComplete: () => {
        gsap.set(sliderRef, { x: '100%' }); // Reset the position to the right corner
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  // if (info.length === 0) {
  //   return null; // Don't render anything if the info array is empty
  // }
  


  return (
    <main className={styles.main}>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
        {info.slice(0, 1).map((news, index) => (
            <p key={news.title} className={styles.slideText}>
            {news.title}
          </p>
          ))}
        </div>
      </div>
    </main>
  );
}

export default InfiniteSlide;