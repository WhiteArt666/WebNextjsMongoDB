import { clerkMiddleware } from '@clerk/nextjs/server'

const handler = (auth: any, req: any) => {
  const path = new URL(req.url).pathname;
  
  // Cho phép truy cập API routes (giống publicRoutes: ["api/:path*"])
  if (path.startsWith('/api/')) {
    return null;
  }
 
 };

 export default clerkMiddleware(handler);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}