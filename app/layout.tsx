import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "highlight.js/styles/vs2015.css";
import { typography } from "@/utils/typography";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

import "../styles/app.scss";

const seo = {
  title: "Tiago Morais // Software development thoughts and notes",
  ogUrl: "https://tiagogm.dev",
  description: "My personal site and blog about software development thoughts and notes",
};

export const viewport: Viewport = {
  themeColor: "#03579e",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://tiagogm.dev"),
    title: seo.title,
    description: seo.description,
    authors: [{ name: "Tiago Morais" }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.ogUrl,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary",
      creator: "@_tgmorais",
      site: "@_tgmorais",
    },
    applicationName: seo.title,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
    },
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      "mobile-web-app-capable": "yes",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force high-priority meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SSR-safe theme initialization to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const themeKey = 'theme-preference';
                const stored = localStorage.getItem(themeKey);
                let theme = 'light';
                
                if (stored === 'light' || stored === 'dark') {
                  theme = stored;
                } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  theme = 'dark';
                }
                
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600;1,700&family=Raleway:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <style id="typography">{`${typography.toString()}`}</style>
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
