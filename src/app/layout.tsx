import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "The best place to buy your favorite products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${openSans.variable}`}
      >
        {/* Header */}
        <Header />
        <ToastContainer position='top-right' autoClose={3000}  closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        {/* Main Content Area */}
        <div className=" min-h-screen">
          {children}
          </div>
      </body>
    </html>
  );
}
