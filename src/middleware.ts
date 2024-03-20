import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed by both signed in and signed out user
  publicRoutes: ["/", "/all-category", 
  "/category/:type", "/product-details/:id", "/search",
   "/cart", "/shop", "/contact", "/blog", "/category"],
});

// By this protects all our routes by default
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
