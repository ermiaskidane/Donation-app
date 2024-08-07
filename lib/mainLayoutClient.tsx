"use client"

import InfiniteSlide from "@/components/inifiniteslideInfo";
import useServerStore from "@/hooks/useServerId";
import { Info, MemberRole, User } from "@prisma/client";
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
    user: MemberRole
  }) => {

  const setServerId = useServerStore((state) => state.setServerId);

  // Role of this is when serverId in hooks/useServerId set to id of server
  // the Navbar component will create margin to make space for Info component
  useEffect(() => {
    setServerId(serverId);
  }, [serverId, setServerId]);

  return (
    <div className="h-full">
      <div className="flex w-full h-11 z-10 flex-col fixed inset-y-0">
        <InfiniteSlide infoList={info} userRole={user} serverId={serverId} />
      </div>
      <main className="h-full z-20">{children}</main>
    </div>
  );
};