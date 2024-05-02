// import { authMiddleware } from "@clerk/nextjs";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

// export default authMiddleware({
//   publicRoutes: ['/', '/blog', '/blog/:slug', "/about", "/api/blog", "/api/blog/:slug", "/api/comments" ],
// });
 
// export const config = {
//       matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

const isPublicRoute = createRouteMatcher(['/', '/blog', '/blog/:slug', "/about", "/api/blog", "/api/blog/:slug", "/api/comments", "/sign-in", "/sign-up", "/api/webhooks/clerk"]);

export default clerkMiddleware((auth, request) =>{ 
  if(!isPublicRoute(request)){
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
