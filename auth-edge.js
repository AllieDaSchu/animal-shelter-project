import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth && auth.user;
      const path = nextUrl.pathname;
      const isProtectedRoute =
        path.startsWith("/owner/addAnimal") ||
        (path.startsWith("/animals/") && path.endsWith("/edit"));
      if (isProtectedRoute && !isLoggedIn) {
        return false; // Redirect to sign-in page
      }
      return true;
    },
  },
});