import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteIdentity } from "@/application/use-cases/get-site-identity";
import { CursorField } from "@/components/cursor-field";
import { SiteBackdrop } from "@/components/site-backdrop";
import { canonical } from "@/domain/content/site";
import { siteIdentityRepository } from "@/infrastructure/container";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const site = getSiteIdentity(siteIdentityRepository);
const { person } = site;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  authors: [{ name: person.fullName }],
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: person.fullName,
  givenName: person.givenName,
  familyName: person.familyName,
  url: canonical(site),
  email: person.email,
  jobTitle: person.jobTitle,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: person.city,
    addressCountry: person.country,
  },
  knowsLanguage: person.languages,
  worksFor: { "@type": "Organization", name: person.employer },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: person.credential,
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
  knowsAbout: person.skills,
  sameAs: person.profiles,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteBackdrop />
        <CursorField />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
