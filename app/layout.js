// import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";

// import {SessionProvider} from "next-auth/react"
import { Providers } from "./providers";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Stock-Management-App",
  description: "Free app for machine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
