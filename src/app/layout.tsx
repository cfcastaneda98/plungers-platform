import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MapProvider from "@/components/layout/MapProvider";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Plungers | Discover Local Experiences",
  description: "Connect with authentic cultural experiences wherever you are. Explore. Connect. Transform.",
  icons: {
    icon: "/images/plungers-favicon.svg",
    apple: "/images/plungers-favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale === "es-mx" ? "es" : "en"}>
      <body className={`${geist.variable} antialiased`}>
        <NextIntlClientProvider>
          <MapProvider>
            <FavoritesProvider>
              <Navbar />
              {children}
              <Footer />
            </FavoritesProvider>
          </MapProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}