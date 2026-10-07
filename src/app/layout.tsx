import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AccountProvider } from "@/components/account-provider";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "LASER veleprodaja · reklamni materijal",
    template: "%s · LASER",
  },
  description:
    "Prototip veleprodajnog shopa LASER d.o.o. Ljubuški: promo artikli, tisak, sublimacija i lasersko graviranje.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bs" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas font-sans text-black">
        <AccountProvider>
          <CartProvider>
            <SiteHeader />
            <div className="flex min-h-full flex-col pl-[88px]">
              {children}
              <SiteFooter />
            </div>
          </CartProvider>
        </AccountProvider>
      </body>
    </html>
  );
}
