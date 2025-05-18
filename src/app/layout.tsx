import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Book Shop",
  description: "Greatest Book Shop Ever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-custom-auxiliar-gray flex font-dm-sans">
        <Provider>
          <Navbar /> {children}
        </Provider>
      </body>
    </html>
  );
}
