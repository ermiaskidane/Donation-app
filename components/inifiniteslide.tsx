'use client'

import React, { useEffect, useRef } from 'react';
import styles from './inifiniteslide.module.css'
import gsap from 'gsap';
import { Info } from '@prisma/client';


interface InfiniteSlideProps {
  infoList: Array<Info>;
}

const InfiniteSlide = ({
  infoList
} : InfiniteSlideProps) => {

  const slider = useRef(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getInfo();

  //       // let updatedNews = []

  //       // // Get the current date and time
  //       // const currentTime = new Date();

  //       // for (let i in result){

  //       //   const createdAt = new Date(result[i].createdAt);

  //       //   // Compare createdAt with the current time
  //       //   if (createdAt >= currentTime) {
  //       //     updatedNews.push(result[i]);
  //       //   }
  //       // }
  //       // setInfo(updatedNews);
  //       setInfo(result);
  //     } catch (error) {
  //       // Handle errors
  //       toast.error("something went wrong");
  //     }
  //   };

  //   fetchData();
  // }, []);

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

  if (infoList.length === 0) {
    return null; // Don't render anything if the info array is empty
  }
  


  return (
    <main className={styles.main}>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
        {infoList.map((news, index) => (
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