import { redirectToSignIn } from "@clerk/nextjs";
import { initialUser } from "@/lib/initial-user";
import { MembersClient } from "./components/client";
import { data } from "@/lib/data"
import { redirect } from "next/navigation";


const MembersPage = async() => {

  const user = await initialUser()
  // console.log("user", user)
  if (!user) {
    return redirectToSignIn();
  }

  if(user.role === "GUEST"){
    redirect("/");
  }
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MembersClient data={data}/>
      </div>
    </div>
  )
}

export default MembersPage;