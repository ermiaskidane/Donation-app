'use client'

import React, { useEffect, useRef } from 'react';
import styles from './inifiniteslide.module.css'
import gsap from 'gsap';

const newsArray = [
  { title: "Breaking News 1 The church plays a crucial role in fostering a sense of community and belonging among Eritrean expatriates, offering religious services, cultural events, and a place for Eritreans to celebrate their rich traditions." },
  { title: "Latest Updates on COVID-19" },
  { title: "Technology Advancements in 2023" },
  { title: "World Economy Outlook" },
  { title: "Sports Highlights of the Week" },
];

function InfiniteSlide() {
  const slider = useRef(null);

  // useEffect(() => {
  //   // Start the animation after a 2-second delay
  //   const startAnimationTimeout = setTimeout(() => {
  //     const sliderRef = slider.current;
  //     const animation = gsap.to(sliderRef, {
  //       x: '-100%',
  //       ease: 'linear',
  //       duration: 10,
  //       repeat: -1,
  //       onComplete: () => {
  //         gsap.set(sliderRef, { x: '100%' }); // Reset the position to the right corner
  //       },
  //     });

  //     // Stop the animation after 10 seconds
  //     const stopAnimationTimeout = setTimeout(() => {
  //       animation.kill();
  //     }, 10000); // 10 seconds

  //     // Clear the stop animation timeout when the component unmounts
  //     return () => {
  //       clearTimeout(stopAnimationTimeout);
  //     };
  //   }, 2000); // 2 seconds

  //   // Clear the start animation timeout when the component unmounts
  //   return () => {
  //     clearTimeout(startAnimationTimeout);
  //   };
  // }, []);

  useEffect(() => {
    const sliderRef = slider.current;
    const animation = gsap.to(sliderRef, {
      x: '-100%',
      ease: 'linear',
      duration: 10,
      repeat: -1,
      onComplete: () => {
        gsap.set(sliderRef, { x: '100%' }); // Reset the position to the right corner
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
        {newsArray.map((news, index) => (
            <p key={news.title} className="slide-text">
            {news.title}
          </p>
          ))}
        </div>
      </div>
    </main>
  );
}

export default InfiniteSlide;


// import Image from 'next/image'

// import styles from './inifiniteslide.module.css'
// import gsap from "gsap";

// import { useEffect, useRef } from 'react';

// const newsArray = [
//   { title: "Breaking News 1" },
//   { title: "Latest Updates on COVID-19" },
//   { title: "Technology Advancements in 2023" },
//   { title: "World Economy Outlook" },
//   { title: "Sports Highlights of the Week" }
// ];

// function InfiniteSlide() {
//   const firstText = useRef(null);

//   const secondText = useRef(null);

//   const slider = useRef(null);

//   let xPercent = 0;
//   let direction = -1

//   useEffect(() => {
//     requestAnimationFrame(animation)
//   },[])

//   const animation = () => {
//     if(xPercent <= -100){
//       xPercent = 0;
//     }
//     gsap.set(firstText.current, {xPercent: xPercent})
//     gsap.set(secondText.current, {xPercent: xPercent})
//     xPercent += 0.25 * direction
//     requestAnimationFrame(animation)
//   }

//   return (

//     <main className={styles.main}>

//       {/* <Image 

//         src="/images/Screenshot (246).png"

//         fill={true}

//         alt="background"

//       /> */}

//       <div className={styles.sliderContainer}>

//         <div ref={slider} className={styles.slider}>

//         {newsArray.map((news, index) => (
//             <p
//               key={news.title}
//               style={{ whiteSpace: 'nowrap' }}
//               ref={firstText}
//             >
//               {news.title}
//             </p>
//           ))}
//           {/* {newsArray.map((news) => (
//             <p ref={firstText} key={news.title}>{news.title}</p>
//           ))}

//           {newsArray.map((news) => (
//             <p ref={secondText} key={news.title}>{news.title}</p>
//           ))} */}
//           {/* <p ref={firstText}>Freelance Developer -</p>

//           <p ref={secondText}>Freelance Developer -</p> */}

//         </div>

//       </div>

//     </main>

//   )
// }

// export default InfiniteSlide