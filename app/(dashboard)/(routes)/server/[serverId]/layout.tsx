import { db } from "@/lib/db";
import { MainLayoutClient } from "@/lib/mainLayoutClient";
import { auth } from "@clerk/nextjs/server";

const MainLayout = async ({ 
  children,
  params 
}: {
  children: React.ReactNode;
  params: {serverId: string}
}) => {
  
  const { serverId } = params;
  const currentClient = auth();
  const userId = currentClient?.userId ?? '';

  // const info = await db.server.findUnique({
  //   where: {
  //     id: params.serverId
  //   },
  //   include: {
  //     infos: true
  //   }
  // });
  const infos = await db.info.findMany({where: {serverId }})
  const user = await db.user.findFirst({ where: { userId } });

  return <MainLayoutClient
   serverId={serverId} info={infos} user={user}>{children}</MainLayoutClient>;
};

export default MainLayout;