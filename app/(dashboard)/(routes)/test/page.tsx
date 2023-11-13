import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialUser } from "@/lib/initial-user";
// import { InitialModal } from "@/components/modals/initial-modal";

const TestPage = async () => {
  console.log("AMAKANDJFKF")
  const profile = await initialUser();

  // console.log("$$$$$$$$$$$$$$", profile) 
  
  // const server = await db.server.findFirst({
  //   where: {
  //     members: {
  //       some: {
  //         profileId: profile.id
  //       }
  //     }
  //   }
  // });

  if (profile) {
    return redirect(`/`);
  }

  return null
}
 
export default TestPage;