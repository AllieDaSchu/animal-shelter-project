import NextAuth from "next-auth";

export const { auth } = NextAuth({
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      const isProtectedRoute =
        path.startsWith("/owner/addAnimal") ||
        (path.startsWith("/animals/") && path.endsWith("/edit"));

      return !(isProtectedRoute && !isLoggedIn);
    },
  },
});
