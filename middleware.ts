import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/blog','/community', '/blog/:slug', "/about", "/api/blog", "/api/blog/:slug", "/api/comments", "/sign-in", "/sign-up", "/api/webhooks/clerk"]);

export default clerkMiddleware((auth, request) =>{ 
  if(!isPublicRoute(request)){
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
