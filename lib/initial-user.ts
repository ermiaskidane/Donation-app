import { RedirectToSignIn, currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { SignedOutAuthObject } from "@clerk/nextjs/server";

export const initialUser = async () => {
  const user = await currentUser();

  console.log("QWQWQWQWQWQWQWQWQW", user)

  if(!user) {
    return redirectToSignIn();
  }

  const profile = await db.user.findUnique({
    where: {
      userId: user.id
    }
  })

  if (profile) {
    return profile;
  }

  const newUser = await db.user.create({
    data: {
      userId: user?.id ,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    }
  })

  return newUser;
}

