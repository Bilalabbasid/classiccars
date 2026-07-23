import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Toaster } from "sonner"
import SmoothScrollProvider from "@/components/layout/smooth-scroll"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CartDrawer from "@/components/layout/cart-drawer"
import WhatsAppButton from "@/components/layout/whatsapp-button"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Classic Chrome | Classic & Sports Car Specialists | London",
    template: "%s | Classic Chrome",
  },
  description:
    "Classic Chrome — London's premier classic and sports car dealership. Est. 1989. Buy, sell, and auction the world's finest classic, sports, and performance cars.",
  keywords: ["classic cars", "sports cars", "car dealer London", "Classic Chrome", "classic car auctions"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Classic Chrome",
    title: "Classic Chrome | Classic & Sports Car Specialists",
    description: "London's premier classic and sports car dealership. Est. 1989.",
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: ["/logo.png"],
    apple: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ivory font-body text-carbon antialiased">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0B0B0C",
                color: "#F6F4EF",
                border: "1px solid #2A2C31",
                borderRadius: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
