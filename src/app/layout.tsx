import type { Metadata } from "next";
import { Jost, Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Futura substitute — geometric sans
const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Univers Condensed substitute — condensed grotesque for meta labels
const barlow = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Wellness by Diana · Nutrióloga Educadora en Diabetes",
  description:
    "Consulta de nutrición presencial en Monterrey y en línea. Plan 100% personalizado, análisis InBody H30 y acompañamiento real. Agenda por WhatsApp.",
  openGraph: {
    title: "Wellness by Diana · Nutrióloga Educadora en Diabetes",
    description:
      "Consulta de nutrición presencial en Monterrey y en línea. Plan 100% personalizado, análisis InBody H30 y acompañamiento real. Agenda por WhatsApp 💚",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jost.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  );
}
