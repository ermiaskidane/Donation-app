import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

// export const POST = async( req: Request) => {
//   try {
//     const user  = await currentUser()

//     console.log("dsasdgrgergd", user)

//     if(!user) {
//       return auth().redirectToSignIn();
//     }

//     const profile = await db.user.findUnique({
//       where: {
//         userId: user.id
//       }
//     })

//     if (profile) { 
//       return profile;
//     }

//     const newUser = await db.user.create({
//       data: {
//         userId: user?.id ,
//         name: `${user.firstName} ${user.lastName}`,
//         email: user.emailAddresses[0].emailAddress,
//         imageUrl: user.imageUrl,
//       }
//     })
//   } catch(error) {
//     console.log('[INFO_DELETE]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

