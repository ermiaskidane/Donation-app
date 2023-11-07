'use client'

import React, { useState } from 'react';
import styles from './inifiniteslide.module.css'
import { Info } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Delete, Plus, X } from 'lucide-react';
import { InfoAddModal } from './Modal/InfoAdd-modal';
import { InfoDeleteModal } from './Modal/InfoDelete-modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useInfoModal from '@/hooks/useInfo';


interface InfiniteSlideProps {
  infoList?: Array<Info>;
}

const InfoNavbar = ({
  infoList
} : InfiniteSlideProps) => {

  const router = useRouter()

  const infoModal = useInfoModal(); 

  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
  
if (!infoModal.isOpen) {
  return null
}

  return (
    <>
    <InfoAddModal
        isOpen={addOpen} 
        onClose={() => setAddOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />
      <InfoDeleteModal
        isOpen={openDelete} 
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
    <main className={styles.main} >
      <Popover>
        <PopoverTrigger asChild>
          <div className={`${styles.sliderContainer}, flex justify-between items-center w-full` } >
            <p className='mx-auto'>Manage New Information</p>
            <X onClick={infoModal.onClose}/>
          </div>
        </PopoverTrigger>
          <PopoverContent className="w-80 bg-[#00ffff] mt-4 ">
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


export default InfoNavbar;