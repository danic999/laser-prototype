import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source",
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
    <html lang="bs" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-foreground">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
