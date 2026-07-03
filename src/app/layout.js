import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { getActiveTheme } from "@/lib/api/theme";
import { themeToCss } from "@/lib/theme/tokensToCss";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PortfolioOS",
  description: "A database-driven, fully dynamic portfolio.",
};

/** Falls back to the "Midnight Indigo" defaults if the API/theme isn't reachable yet. */
const FALLBACK_THEME = {
  name: "Midnight Indigo (fallback)",
  fonts: { body: "Inter", heading: "Inter", mono: "JetBrains Mono" },
  radius: 10,
  light: {
    primary: "#4F46E5",
    secondary: "#64748B",
    accent: "#06B6D4",
    base100: "#F8FAFC",
    base200: "#FFFFFF",
    base300: "#E2E8F0",
    heading: "#0F172A",
    body: "#334155",
    muted: "#64748B",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  dark: {
    primary: "#6366F1",
    secondary: "#94A3B8",
    accent: "#22D3EE",
    base100: "#0B1120",
    base200: "#1E293B",
    base300: "#334155",
    heading: "#F1F5F9",
    body: "#CBD5E1",
    muted: "#94A3B8",
    success: "#22C55E",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
};

export default async function RootLayout({ children }) {
  const theme = await getActiveTheme().catch(() => FALLBACK_THEME);
  const themeCss = themeToCss(theme);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
