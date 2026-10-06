import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const dosis = Dosis({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "800"],
  variable: "--font-dosis",
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
    <html lang="bs" className={`${dosis.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-bass">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
