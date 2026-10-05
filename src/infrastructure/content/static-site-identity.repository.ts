import type { SiteIdentityRepository } from "@/application/ports/site-identity.repository";
import type { SiteIdentity } from "@/domain/content/site";

const DESCRIPTION =
  "Ingeniero mecatrónico y desarrollador full-stack senior. Construyo plataformas de banca " +
  "digital: microfrontends, microservicios en NestJS e infraestructura como código en Terraform.";

const IDENTITY: SiteIdentity = {
  url: "https://alejoavila.com",
  name: "Alejandro Ávila",
  title: "Alejandro Ávila — Senior Full-Stack Engineer",
  titleTemplate: "%s — Alejandro Ávila",
  description: DESCRIPTION,
  locale: "es_CO",
  person: {
    fullName: "Alejandro Ávila Guerrero",
    givenName: "Alejandro",
    familyName: "Ávila Guerrero",
    jobTitle: "Senior Full-Stack Engineer",
    email: "alejandroavilaguerrero@gmail.com",
    city: "Bogotá",
    country: "CO",
    languages: ["es", "en"],
    employer: "Banco de Bogotá",
    credential: "Ingeniero Mecatrónico",
    alumniOf: "Corporación Tecnológica Industrial Colombiana (TEINCO)",
    skills: [
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
    profiles: ["https://github.com/alejoavilag", "https://co.linkedin.com/in/alejoavilag"],
  },
};

export const staticSiteIdentityRepository: SiteIdentityRepository = {
  load: () => IDENTITY,
};
