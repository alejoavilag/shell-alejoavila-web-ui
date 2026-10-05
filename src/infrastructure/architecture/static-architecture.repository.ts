import type { ArchitectureRepository } from "@/application/ports/architecture.repository";
import type { ArchitectureModel } from "@/domain/architecture/model";

const MODEL: ArchitectureModel = {
  components: [
    { id: "cdn", layer: "edge", name: "CDN", technology: "Firebase Hosting" },
    { id: "shell", layer: "frontend", name: "Shell", technology: "Next.js" },
    { id: "widget", layer: "frontend", name: "Widget", technology: "Angular" },
    { id: "api", layer: "backend", name: "API", technology: "NestJS · Cloud Run" },
    { id: "store", layer: "data", name: "Firestore", technology: "NoSQL" },
  ],
  links: [
    { from: "cdn", to: "shell", layer: "frontend" },
    { from: "cdn", to: "widget", layer: "frontend" },
    { from: "shell", to: "api", layer: "backend" },
    { from: "widget", to: "api", layer: "backend" },
    { from: "api", to: "store", layer: "data" },
  ],
  boundary: { layer: "infra", name: "Terraform · IaC" },
  summary:
    "Diagrama de la arquitectura del sitio. Una capa de borde con CDN en Firebase Hosting " +
    "distribuye dos piezas de frontend: un shell en Next.js y un widget en Angular cargado " +
    "en runtime. Ambos consumen un API en NestJS sobre Cloud Run, que persiste en Firestore. " +
    "Toda la infraestructura se define como código en Terraform.",
};

export const staticArchitectureRepository: ArchitectureRepository = {
  load: () => MODEL,
};
