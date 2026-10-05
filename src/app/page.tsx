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
    lead: "Dos aplicaciones distintas, con stacks distintos y despliegues independientes, se ensamblan en el navegador del visitante. Esta página es el ejemplo: lo que estás leyendo y el chat son piezas separadas.",
    columns: [
      {
        label: "Shell",
        sub: "Next.js · React",
        points: [
          "Orquesta rutas, layout y estado compartido entre los remotos",
          "Module Federation para cargar aplicaciones de otros equipos sin recompilar",
          "Librerías de UI versionadas y consumidas por varios productos",
        ],
      },
      {
        label: "Widget",
        sub: "Angular · Stencil",
        points: [
          "Empaquetado como Web Component, montable en cualquier shell",
          "Sin acoplamiento al framework que lo hospeda",
          "Se despliega solo, sin tocar el shell",
        ],
      },
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

const FLOWS = [
  "Firma electrónica",
  "Segundo factor de autenticación",
  "Validación de identidad",
  "Evaluación de riesgo",
  "Renovación y reclasificación de productos de crédito",
];

const BUILD = [
  { label: "Costo mensual", value: "0 USD, dentro de la capa gratuita", state: "live" },
  { label: "Frontend", value: "Next.js, export estático en Firebase Hosting", state: "live" },
  { label: "Infraestructura", value: "Terraform, dos capas con permisos separados", state: "live" },
  { label: "Autenticación de CI", value: "Workload Identity Federation, sin llaves JSON", state: "live" },
  { label: "Widget", value: "Angular Elements, desplegado y versionado aparte", state: "wip" },
  { label: "Backend", value: "NestJS en Cloud Run, escala a cero", state: "wip" },
];

const EMAIL = "alejandroavilaguerrero@gmail.com";

const REPOS = [
  { href: "https://github.com/alejoavilag/shell-alejoavila-web-ui", label: "shell-alejoavila-web-ui" },
  { href: "https://github.com/alejoavilag/alejoavila-gcp-iac", label: "alejoavila-gcp-iac" },
];

const LINKS = [
  { href: `mailto:${EMAIL}`, label: EMAIL },
  { href: "https://github.com/alejoavilag", label: "GitHub" },
  { href: "https://co.linkedin.com/in/alejoavilag", label: "LinkedIn" },
];

const FACTS = [
  { label: "Experiencia", value: "6 años en software, todos en banca digital" },
  { label: "Antes", value: "5 años en mantenimiento y automatización industrial" },
  { label: "Idiomas", value: "Español nativo · English B1, lectura y escritura técnica" },
  { label: "Ubicación", value: "Bogotá, Colombia · Abierto a trabajo remoto" },
];

export default function Home() {
  return (
    <main className="relative">
      <div className="zone-light relative">
        <header className="relative z-10 mx-auto max-w-6xl snap-start px-4 lg:pl-20">
          <div className="hero-dissolve relative flex h-svh flex-col justify-center">
            <p
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
                href="#perfil"
                className="rounded-lg bg-accent px-5 py-3 font-medium text-accent-contrast shadow-[0_8px_30px_var(--glow)] transition-shadow hover:shadow-[0_12px_44px_var(--glow)]"
              >
                Empezar el recorrido
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
          id="perfil"
          aria-labelledby="perfil-title"
          className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center px-4 py-20 lg:pl-20"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
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

        <section
          id="dominio"
          aria-labelledby="dominio-title"
          className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center border-t border-border px-4 py-20 lg:pl-20"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden className="h-px w-8 bg-accent" />
            Dominio
          </p>
          <h2
            id="dominio-title"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Banca digital, donde un error no es un bug de interfaz
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-text-muted">
              <p>
                Mi dominio es la banca digital, específicamente la originación y el
                desembolso de crédito empresarial. Son sistemas donde una falla no se
                queda en la pantalla: tiene consecuencias regulatorias y financieras.
              </p>
              <p className="text-text">
                Trabajar en un entorno regulado cambia cómo construyes. La trazabilidad,
                el permiso mínimo y la revisión de seguridad no son etapas al final del
                proyecto: son condiciones de entrada.
              </p>
            </div>
            <ul className="h-fit space-y-2.5 rounded-2xl border border-border bg-surface p-6">
              <li className="pb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Flujos que he construido
              </li>
              {FLOWS.map((flow) => (
                <li key={flow} className="flex gap-3 text-text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{flow}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section id="stack" className="relative">
        <ScrollSpine />
        <LayeredStory sections={SECTIONS} />
      </section>

      <section
        id="caso"
        aria-labelledby="caso-title"
        className="panel-pass relative z-10 mx-auto flex min-h-svh max-w-6xl snap-start flex-col justify-center px-4 py-20 lg:pl-20"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden className="h-px w-8 bg-accent" />
          Caso de estudio
        </p>
        <h2
          id="caso-title"
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Este sitio es el ejemplo
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">
          Todo lo que acabas de leer está aplicado aquí mismo. El código es público y la
          infraestructura se define en Terraform, así que cada línea de esta tabla se
          puede verificar en los repositorios.
        </p>

        <dl className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {BUILD.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent sm:w-52 sm:shrink-0">
                {row.label}
              </dt>
              <dd className="flex-1 leading-relaxed text-text-muted">{row.value}</dd>
              <dd
                className={`font-mono text-[11px] tracking-[0.1em] ${
                  row.state === "live" ? "text-accent" : "text-text-muted"
                }`}
              >
                {row.state === "live" ? "en línea" : "en construcción"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-4">
          {REPOS.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              className="rounded-lg border border-border-strong px-5 py-3 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {repo.label}
            </a>
          ))}
        </div>
      </section>

      <footer
        id="contacto"
        aria-labelledby="contacto-title"
        className="relative z-10 mx-auto flex min-h-svh max-w-6xl snap-end flex-col justify-center px-4 py-20 lg:pl-20"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          <span aria-hidden className="h-px w-8 bg-accent" />
          Contacto
        </p>
        <h2
          id="contacto-title"
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Hablemos
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-text-muted">
          Estoy abierto a posiciones remotas de Senior Full-Stack o Platform Engineer.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border-strong px-5 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-20 flex items-center gap-2.5 font-mono text-xs text-text-muted">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 shrink-0 text-accent"
          >
            <path d="M12 21s-7.5-4.7-9.4-9A5.4 5.4 0 0 1 12 6.2a5.4 5.4 0 0 1 9.4 5.8C19.5 16.3 12 21 12 21Z" />
          </svg>
          Diseñado por Alejandro Ávila, a cuatro manos con Claude
        </p>
      </footer>
    </main>
  );
}
