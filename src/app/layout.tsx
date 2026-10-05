import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const sourceSans = Source_Sans_3({
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
    <html lang="bs" className={`${outfit.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-foreground">
        <SiteHeader />
        <div className="border-b border-laser/20 bg-[#f8ebe8] text-ink">
          <p className="mx-auto max-w-[1180px] px-4 py-2 text-xs leading-relaxed sm:px-6">
            Pregled izgleda. Ljestvice cijena su primjer rasporeda, ne službeni cjenik LASER d.o.o.
          </p>
        </div>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
