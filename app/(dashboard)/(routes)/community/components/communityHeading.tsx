"use client"

import axios from 'axios';
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { ServerModal, ServerModalValues } from '@/components/Modal/server-modal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const CommunityHeading = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [calenderOpen, setCalenderOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const onSubmit = async (data: ServerModalValues) => {
    try {
      setLoading(true)
      await axios.post(`/api/community/`, data)

      router.refresh();
      router.push('/community');
      toast.success("community has been created")
    } catch (error: any){
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  return (
    <>
      <ServerModal
        isOpen={open} 
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <h2 className="py-4 text-center text-2xl font-bold sm:text-2xl">Communitys</h2>
          <div className="flex gap-2 mt-1 mb-4 sm:my-0">
              <Button onClick={() => setOpen(true)} className="w-32 sm:w-full" >
                Add Community
              </Button>
          </div>
      </div>
    </>
  )
}
