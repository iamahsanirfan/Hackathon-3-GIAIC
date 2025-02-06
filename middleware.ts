// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/shop',
  '/search',
  '/blog',
  '/contact',
  '/rocket-seater',
  '/api/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Check the pathname of the request
  
  }
  // If it's a public route, simply allow the request to continue.
);

// Configure Next.js middleware matcher
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
