"use client"

import InfiniteSlide from "@/components/inifiniteslideInfo";
import useServerStore from "@/hooks/useServerId";
import { Info, User } from "@prisma/client";
import { useEffect } from "react";

 const CommonLayoutClient = ({
   children,  
}: {
    children: React.ReactNode;
  }) => {

  const setServerId = useServerStore((state) => state.setServerId);

  // set back the serverId to null sothat InfiniteSlide componenet will be closed
  useEffect(() => {
    setServerId("");
  }, [setServerId]);

  return (
    <div className="h-full">
      <main className="h-full z-20">{children}</main>
    </div>
  );
};

export default CommonLayoutClient