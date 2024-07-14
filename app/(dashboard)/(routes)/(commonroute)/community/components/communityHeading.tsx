"use client"

import axios from 'axios';
import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import { ServerModal, ServerModalValues } from '@/components/Modal/server-modal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
interface CommunityHeadingProps {
  search: string | undefined;
}

export const CommunityHeading = ({search}: CommunityHeadingProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalKey, setModalKey] = useState<number>(0);

  const formRef = useRef<HTMLFormElement>(null);

  const {userId} = useAuth()

  const router = useRouter()

  const onSubmit = async (data: ServerModalValues) => {
    try {
      setLoading(true)
      await axios.post(`/api/community/`, data)

      // router.refresh();
      // window.location.reload(); // Perform a hard refresh
      // soft refresh (reset the data)
      // form.reset()
      setModalKey(prevKey => prevKey + 1);
      router.push('/community');
      toast.success("community has been created")
    } catch (error: any){
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(!open);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const searchString = formData.get("search") as string;

    try {
      router.push(searchString ? `/community?search=${searchString}` : "/community");
      // Reset the form
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error: any) {
      toast.error('Search failed.');
    }
  };

  return (
    <>
      <ServerModal
        key={modalKey} 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
        loading={loading}
      />

      <div className="flex  sm:flex-row items-center justify-between">
        <h2 className="py-4 text-center text-2xl font-bold sm:text-2xl">Communities</h2>
        <div className="flex gap-2 mt-1 mb-4 sm:my-0">
          {userId && (
            <Button onClick={() => setOpen(true)} className="w-32 sm:w-full" >
              Add Community
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-start my-10">
        <form
          ref={formRef}
          onSubmit={handleSearch}
          className='w-full'
          >
            <div className=''>
              <div className='flex gap-2 item-center'>
                <div className='flex relative max-w-md w-full'>
                  <Input
                  type="text"
                  name="search"
                  defaultValue={search}
                  // className='w-full'
                  />
                  {search && (
                    <Button
                      size="icon"
                      variant="link"
                      className="absolute right-0 top-0"
                      asChild
                    >
                      <Link href={`/community`}>
                        <XIcon/>
                      </Link>
                    </Button>
                  )}
                </div>
                <Button>Search</Button>
              </div>
            </div>
        </form>
      </div>
    </>
  )
}
