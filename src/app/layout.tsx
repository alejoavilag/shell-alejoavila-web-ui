import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CursorField } from "@/components/cursor-field";
import { SiteBackdrop } from "@/components/site-backdrop";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://alejoavila.web.app";

const DESCRIPTION =
  "Ingeniero mecatrónico y desarrollador full-stack senior. Construyo plataformas de banca " +
  "digital: microfrontends, microservicios en NestJS e infraestructura como código en Terraform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alejandro Ávila — Senior Full-Stack Engineer",
    template: "%s — Alejandro Ávila",
  },
  description: DESCRIPTION,
  authors: [{ name: "Alejandro Ávila Guerrero" }],
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "Alejandro Ávila",
    title: "Alejandro Ávila — Senior Full-Stack Engineer",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Ávila — Senior Full-Stack Engineer",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Alejandro Ávila Guerrero",
  givenName: "Alejandro",
  familyName: "Ávila Guerrero",
  url: SITE_URL,
  email: "alejandroavilaguerrero@gmail.com",
  jobTitle: "Senior Full-Stack Engineer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  knowsLanguage: ["es", "en"],
  worksFor: { "@type": "Organization", name: "Banco de Bogotá" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "Ingeniero Mecatrónico",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Corporación Tecnológica Industrial Colombiana (TEINCO)",
  },
  knowsAbout: [
    "TypeScript",
    "NestJS",
    "Node.js",
    "Angular",
    "React",
    "Next.js",
    "Stencil",
    "Microfrontends",
    "Module Federation",
    "Web Components",
    "Hexagonal architecture",
    "Microservices",
    "Terraform",
    "Infrastructure as Code",
    "AWS",
    "Google Cloud Platform",
    "Cloud Run",
    "CI/CD",
    "DynamoDB",
    "Firestore",
    "Application security",
    "Fintech",
    "Digital banking",
  ],
  sameAs: ["https://github.com/alejoavilag", "https://co.linkedin.com/in/alejoavilag"],
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
