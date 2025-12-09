//export { default } from "next-auth/middleware"
export {auth as middleware} from "@/auth-edge"

export const config = {
  matcher: ["/addAnimal", "/animals/:path*/edit"],
};