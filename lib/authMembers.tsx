import { auth } from "@clerk/nextjs/server";
import { currentProfile } from "./current-profile";
import { Position } from "@prisma/client";
import { redirect } from "next/navigation";

export const AuthMembers = async(serverId: string) => {
  // Give access only for Admin Members
  const currentuser = await currentProfile(serverId)

  if (!currentuser) {
    return auth().redirectToSignIn();
  }
 
  const UserRole = currentuser.server?.positions.find((pos: Position) => pos.userId === currentuser.id)?.role

  // user with empty server or positions or "guest" or "undefined" Role browse them back to homepage
  if(currentuser.server === null || currentuser.server.positions.length === 0 || UserRole === "GUEST" || UserRole === undefined){
    redirect("/");
  }

  return { UserRole, currentuser}
}