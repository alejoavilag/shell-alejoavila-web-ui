import { LayeredStory, type Section } from "@/components/layered-story";

const SECTIONS: Section[] = [
  {
    id: "edge",
    eyebrow: "Capa de borde",
    title: "Todo empieza en el CDN",
    lead: "El contenido se sirve pre-renderizado desde una red de distribución global, sin servidor que mantener y con certificado gestionado.",
    points: [
      "HTML estático distribuido en el borde, con caché agresiva para los recursos versionados",
      "Cabeceras de seguridad aplicadas en el origen: HSTS, nosniff, control de marcos y política de contenido",
      "Funciones en el borde para manipular peticiones y respuestas antes de que lleguen al origen",
    ],
  },
  {
    id: "frontend",
    eyebrow: "Capa de frontend",
    title: "Microfrontends que se componen en runtime",
    lead: "Trabajo frontend a escala con arquitectura de microfrontends: aplicaciones desplegables de forma independiente que se ensamblan en el navegador.",
    points: [
      "Angular con Module Federation para despliegues independientes por equipo",
      "Web Components con Stencil, consumibles desde cualquier shell sin importar su stack",
      "Librerías de UI compartidas y versionadas entre varios productos",
      "React y Next.js en proyectos propios, incluido este sitio",
    ],
  },
  {
    id: "backend",
    eyebrow: "Capa de backend",
    title: "Servicios con el dominio aislado",
    lead: "Construyo microservicios en NestJS y TypeScript sobre arquitectura hexagonal, documentados con OpenAPI y cubiertos con pruebas.",
    points: [
      "Puertos y adaptadores que mantienen el núcleo de negocio testeable y portable",
      "APIs públicas y privadas con contratos OpenAPI como fuente de verdad",
      "Arquitectura dirigida por eventos para procesos asíncronos",
      "Escalado a cero: el servicio no consume nada mientras nadie lo llama",
    ],
  },
  {
    id: "data",
    eyebrow: "Capa de datos",
    title: "Modelado por patrón de acceso",
    lead: "Trabajo datos sobre bases NoSQL y relacionales, diseñando el modelo a partir de cómo se consulta y no al revés.",
    points: [
      "DynamoDB con diseño de claves orientado a los patrones de acceso reales",
      "Bases relacionales para lo que exige consistencia e integridad referencial",
      "Procesamiento batch en Spark para transformación de datos",
    ],
  },
  {
    id: "infra",
    eyebrow: "Infraestructura",
    title: "Nada se crea a mano",
    lead: "Gestiono infraestructura como código en Terraform, con módulos reutilizables, estado remoto y separación por ambiente.",
    points: [
      "Despliegue continuo autenticado por identidad federada, sin llaves de larga vida",
      "Separación entre la capa que puede otorgar permisos y la que automatiza CI",
      "Compuertas de calidad y seguridad obligatorias en cada integración",
      "Rotación de secretos y monitoreo proactivo como parte de la operación",
    ],
  },
];

export default function Home() {
  const hero = (
    <header className="relative">
      <div className="relative flex min-h-[78vh] flex-col justify-center py-20">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="pulse-ring size-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--glow)]" />
            Bogotá · Abierto a trabajo remoto
          </p>
          <h1 className="glow-text mt-7 text-5xl font-semibold tracking-tight sm:text-7xl">
            Alejandro Ávila
          </h1>
          <p className="mt-4 font-mono text-lg tracking-tight text-accent sm:text-xl">
            Senior Full-Stack Engineer · Platform &amp; Cloud
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
            Construyo plataformas de banca digital de punta a punta: microfrontends,
            microservicios e infraestructura como código.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {["TypeScript", "NestJS", "Angular", "React", "Terraform", "AWS", "GCP"].map(
              (tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {tech}
                </li>
              ),
            )}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#edge-title"
              className="rounded-lg bg-accent px-5 py-3 font-medium text-[#04060c] shadow-[0_0_28px_var(--glow)] transition-shadow hover:shadow-[0_0_44px_var(--glow)]"
            >
              Recorrer la arquitectura
            </a>
            <a
              href="https://github.com/alejoavilag"
              className="rounded-lg border border-border-strong px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
        </div>
      </div>
    </header>
  );

  return (
    <main>
      <LayeredStory sections={SECTIONS} hero={hero} />

      <footer className="mx-auto max-w-6xl border-t border-border px-4 py-12">
        <p className="font-mono text-xs text-text-muted">
          Este sitio corre en Google Cloud dentro de la capa gratuita, desplegado con
          Terraform desde GitHub Actions sin llaves de larga vida.
        </p>
      </footer>
    </main>
  );
}
