// import { currentUser, redirectToSignIn, auth } from "@clerk/nextjs/server";

// import { db } from "@/lib/db";

// export const initialUser = async () => {
//   const user = await currentUser();

//   console.log("QWQWQWQWQWQWQWQWQW", user)

//   if(!user) {
//     return auth().redirectToSignIn();
//   }

//   const profile = await db.user.findUnique({
//     where: {
//       userId: user.id
//     }
//   })

//   // console.log("from profile 1", profile)

//   if (profile) { 
//     return profile;
//   }

//   // console.log("111111111111from profile 111111111", profile)

//   const newUser = await db.user.create({
//     data: {
//       userId: user?.id ,
//       name: `${user.firstName} ${user.lastName}`,
//       email: user.emailAddresses[0].emailAddress,
//       imageUrl: user.imageUrl,
//     }
//   })
//   // console.log("22222222222222from newUser 22222222222222", newUser)
//   return newUser;
// }

