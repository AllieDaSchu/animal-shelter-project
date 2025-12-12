import "./globals.css";
import Navbar from "@/components/Navbar.js"
import Footer from "@/components/Footer.jsx"
import SessionProvider from "@/components/SessionProvider";

export const metadata = {
  title: "Happy Paws Animal Shelter",
  description: "Where animals find their fur-ever home",
  
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
