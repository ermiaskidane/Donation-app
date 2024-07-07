import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MainLayoutClient } from "@/lib/mainLayoutClient";
import { auth } from "@clerk/nextjs/server";
import { Position } from "@prisma/client";
import { redirect } from "next/navigation";

const MainLayout = async ({ 
  children,
  params 
}: {
  children: React.ReactNode;
  params: {serverId: string}
}) => {
  
  const { serverId } = params;

  const infos = await db.info.findMany({where: {serverId }})

  const currentuser = await currentProfile(params.serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }
 
  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

  return <MainLayoutClient
   serverId={serverId} info={infos} user={UserRole}>{children}</MainLayoutClient>;
};

export default MainLayout;