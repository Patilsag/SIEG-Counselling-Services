import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sieg Counselling Services | Study in Germany, guided by lived experience" },
      {
        name: "description",
        content:
          "First-hand guidance for Indian students planning a Master's in Germany: universities, APS, blocked account, visa, accommodation. Book a free call with Sagar.",
      },
      { name: "theme-color", content: "#0a233f" },
      { property: "og:title", content: "Sieg Counselling Services | Study in Germany" },
      {
        property: "og:description",
        content:
          "Personal guidance from someone living in Germany since 2019. TU9, APS, visa, blocked account, accommodation. The real path.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.siegcounselling.com/" },
      { property: "og:image", content: "https://www.siegcounselling.com/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sieg Counselling Services | Study in Germany" },
      { name: "twitter:image", content: "https://www.siegcounselling.com/og.jpg" },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-GSQ3H9E9YP",
        async: true,
      },
      {
        children:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GSQ3H9E9YP');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Sieg Counselling Services",
          alternateName: "Sieg Counselling",
          url: "https://www.siegcounselling.com",
          logo: "https://www.siegcounselling.com/og.jpg",
          slogan: "Study in Germany, guided by a team that actually lives here",
          foundingDate: "2024",
          address: { "@type": "PostalAddress", addressCountry: "IN" },
          knowsAbout: [
            "Master's degree admissions in Germany",
            "APS certificate for Indian students",
            "Uni-assist applications and VPD",
            "German student visa from India",
            "Blocked account (Sperrkonto)",
            "Werkstudent and Work Student jobs",
            "Public universities and TU9",
          ],
          description:
            "First-hand study-abroad counselling for Indian students planning a Master's in Germany: university shortlisting, Uni-assist applications, APS, blocked account, visa, accommodation and Work Student guidance.",
          email: "info@siegcounselling.com",
          telephone: "+91-8806221060",
          areaServed: ["IN", "DE"],
          founder: {
            "@type": "Person",
            name: "Sagar S. Patil",
            jobTitle: "Founder",
            image: "https://www.siegcounselling.com/founder/sagar-patil.jpg",
            description:
              "Founder of Sieg Counselling Services. MSc in Environmental & Resource Management; living in Germany since 2019, guiding Indian students through the full study-in-Germany journey one-to-one.",
          },
          sameAs: [
            "https://www.instagram.com/siegcounsellingservices/",
            "https://www.linkedin.com/company/136126364/",
            "https://www.facebook.com/profile.php?id=61591777750073",
          ],
        }),
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.siegcounselling.com/" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "preload", href: "/fonts/fraunces-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/hero-poster.jpg", as: "image" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
