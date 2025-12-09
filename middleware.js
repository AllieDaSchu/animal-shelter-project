export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/addAnimal", "/animals/:path*/edit"],
};