'use client'

import React, { useEffect, useRef, useState } from 'react';
import styles from './inifiniteslide.module.css'
import gsap from 'gsap';
import { Info } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Delete, Plus, EyeOff } from 'lucide-react';
import { InfoAddModal } from './Modal/InfoAdd-modal';
import { InfoDeleteModal } from './Modal/InfoDelete-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface InfiniteSlideProps {
  infoList: Array<Info>;
}

const InfiniteSlide = ({
  infoList
} : InfiniteSlideProps) => {

  const router = useRouter()

  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const slider = useRef(null);

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

  const onSubmit = async (data: {title: string}) => {
    try {
      setLoading(true)

      await axios.post(`/api/info/`, data)

      
      router.refresh();
      // router.push('/expense');
      toast.success("Info has been created")
    } catch(error: any){
      toast.error('Something went wrong.');
    } finally{
      setLoading(false);
      setAddOpen(!addOpen);
    }
  }


  const onConfirm = async () => {
    try {
      setLoading(true);
      // console.log("JJJJJJJJJJJJ", data)
      await axios.delete(`/api/info/`);
      toast.success('Info deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpenDelete(!openDelete);
    }
  }

  if (infoList.length === 0) {
    return null; // Don't render anything if the info array is empty
  }
  


  return (
    <>
    <InfoAddModal
        isOpen={addOpen} 
        onClose={() => setAddOpen(false)}
        onSubmit={onSubmit}
        loading={false}
      />
      <InfoDeleteModal
        isOpen={openDelete} 
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirm}
        loading={false}
      />
    <main className={styles.main}>
      <Popover>
        <PopoverTrigger asChild>
          <div className={styles.sliderContainer} >
            {/* <EyeOff className='absolute   z-50 block cursor-pointer'/> */}
            <div ref={slider} className={styles.slider}>
            {infoList.map((news, index) => (
                  <p key={news.title} className={styles.slideText}>
                    {news.title}
                  </p>
              ))}
            </div>
          </div>
        </PopoverTrigger>
          <PopoverContent className="w-80 bg-[#00ffff] mt-4 ali">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Info</h4>
                <p className="text-sm text-muted-foreground">
                  Fill information you want to display.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                <p onClick={() => setAddOpen(true)}><Plus className="mb-1 mr-1 h-4 w-4 inline-block" /> Add New</p>
                <p onClick={() => setOpenDelete(true)}><Delete className="mb-1 mr-1 h-4 w-4 inline-block" /> Delete</p>
              </div>
            </div>
        </PopoverContent>
      </Popover>
    </main>
  </>
  );
}


export default InfiniteSlide;