"use client"

import InfiniteSlide from "@/components/inifiniteslideInfo";
import useServerStore from "@/hooks/useServerId";
import { Info, User } from "@prisma/client";
import { useEffect } from "react";

export const MainLayoutClient = ({
   children, 
   serverId, 
   info, 
   user 
}: {
    children: React.ReactNode;
    serverId: string;
    info: Info[];
    user: User | null
  }) => {

  const setServerId = useServerStore((state) => state.setServerId);

  useEffect(() => {
    setServerId(serverId);
  }, [serverId, setServerId]);

  return (
    <div className="h-full">
      <div className="flex w-full h-[41px] z-10 flex-col fixed inset-y-0">
        <InfiniteSlide infoList={info} currentUser={user} serverId={serverId} />
      </div>
      <main className="h-full z-20">{children}</main>
    </div>
  );
};