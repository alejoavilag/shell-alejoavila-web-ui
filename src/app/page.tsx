import { LayeredStory, type Section } from "@/components/layered-story";
import { ScrollSpine } from "@/components/scroll-spine";

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

const STACK = ["TypeScript", "NestJS", "Angular", "React", "Terraform", "AWS", "GCP"];

const FACTS = [
  { label: "Experiencia", value: "6 años en software, todos en banca digital" },
  { label: "Antes", value: "5 años en mantenimiento y automatización industrial" },
  { label: "Idiomas", value: "Español nativo · English B1, lectura y escritura técnica" },
  { label: "Ubicación", value: "Bogotá, Colombia · Abierto a trabajo remoto" },
];

export default function Home() {
  return (
    <main className="relative">
      <ScrollSpine />

      <div className="zone-light relative">
        <header className="mx-auto max-w-6xl px-4 lg:pl-20">
          <div className="flex min-h-[86vh] flex-col justify-center py-20">
            <p
              data-spine-node
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
            >
              <span className="pulse-ring size-1.5 rounded-full bg-accent" />
              Bogotá · Abierto a trabajo remoto
            </p>
            <h1 className="mt-7 text-5xl font-semibold tracking-tight sm:text-7xl">
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
              {STACK.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#stack"
                className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-contrast shadow-[0_8px_30px_var(--glow)] transition-shadow hover:shadow-[0_12px_44px_var(--glow)]"
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

        <section
          aria-labelledby="perfil-title"
          className="mx-auto max-w-6xl border-t border-border px-4 py-24 lg:pl-20"
        >
          <p
            data-spine-node
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            <span aria-hidden className="h-px w-8 bg-accent" />
            Perfil
          </p>
          <h2
            id="perfil-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            No llegué al software por el camino corto
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-text-muted">
              <p>
                Soy ingeniero mecatrónico y desarrollador full-stack senior. Trabajo en
                plataformas de originación de crédito empresarial, cubriendo las tres
                capas: el frontend en arquitectura de microfrontends, los servicios de
                backend, y la infraestructura que los sostiene.
              </p>
              <p>
                Pasé casi cinco años manteniendo, reparando y poniendo a punto maquinaria
                industrial: tarjetas electrónicas, sistemas de control y potencia, equipos
                importados que tenían que funcionar en planta. Esa etapa me dejó un sesgo
                que sigo usando — pienso el sistema completo antes que las piezas, y asumo
                que todo lo que se despliega eventualmente falla.
              </p>
              <p className="text-text">
                En software eso se traduce en algo concreto: no entrego un endpoint sin
                saber cómo se despliega, cómo se observa y cómo se asegura.
              </p>
            </div>
            <dl className="h-fit divide-y divide-border rounded-2xl border border-border bg-surface">
              {FACTS.map((fact) => (
                <div key={fact.label} className="px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <div id="zone-fade" className="zone-fade h-[32vh]" />

      <section id="stack" className="relative pt-4 pb-8">
        <LayeredStory sections={SECTIONS} />
      </section>

      <footer className="mx-auto max-w-6xl border-t border-border px-4 py-12 lg:pl-20">
        <p className="font-mono text-xs text-text-muted">
          Este sitio corre en Google Cloud dentro de la capa gratuita, desplegado con
          Terraform desde GitHub Actions sin llaves de larga vida.
        </p>
      </footer>
    </main>
  );
}
