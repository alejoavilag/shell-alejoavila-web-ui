import type { LandingContentRepository } from "@/application/ports/landing-content.repository";
import type { LandingContent } from "@/domain/content/landing";

const EMAIL = "alejandroavilaguerrero@gmail.com";
const GITHUB = "https://github.com/alejoavilag";
const LINKEDIN = "https://co.linkedin.com/in/alejoavilag";

const CONTENT: LandingContent = {
  hero: {
    badge: "Bogotá · Abierto a trabajo remoto",
    name: "Alejandro Ávila",
    role: "Senior Full-Stack Engineer · Platform & Cloud",
    lead:
      "Construyo plataformas de banca digital de punta a punta: microfrontends, " +
      "microservicios e infraestructura como código.",
    stack: ["TypeScript", "NestJS", "Angular", "React", "Terraform", "AWS", "GCP"],
    primary: { href: "#perfil", label: "Empezar el recorrido" },
    secondary: { href: GITHUB, label: "GitHub" },
  },

  profile: {
    eyebrow: "Perfil",
    title: "No llegué al software por el camino corto",
    paragraphs: [
      "Soy ingeniero mecatrónico y desarrollador full-stack senior. Trabajo en " +
        "plataformas de originación de crédito empresarial, cubriendo las tres capas: " +
        "el frontend en arquitectura de microfrontends, los servicios de backend, y la " +
        "infraestructura que los sostiene.",
      "Pasé casi cinco años manteniendo, reparando y poniendo a punto maquinaria " +
        "industrial: tarjetas electrónicas, sistemas de control y potencia, equipos " +
        "importados que tenían que funcionar en planta. Esa etapa me dejó un sesgo que " +
        "sigo usando — pienso el sistema completo antes que las piezas, y asumo que todo " +
        "lo que se despliega eventualmente falla.",
    ],
    closing:
      "En software eso se traduce en algo concreto: no entrego un endpoint sin saber " +
      "cómo se despliega, cómo se observa y cómo se asegura.",
    facts: [
      { label: "Experiencia", value: "6 años en software, todos en banca digital" },
      { label: "Antes", value: "5 años en mantenimiento y automatización industrial" },
      {
        label: "Idiomas",
        value: "Español nativo · English B1, lectura y escritura técnica",
      },
      { label: "Ubicación", value: "Bogotá, Colombia · Abierto a trabajo remoto" },
    ],
  },

  expertise: {
    eyebrow: "Dominio",
    title: "Banca digital, donde un error no es un bug de interfaz",
    paragraphs: [
      "Mi dominio es la banca digital, específicamente la originación y el desembolso " +
        "de crédito empresarial. Son sistemas donde una falla no se queda en la pantalla: " +
        "tiene consecuencias regulatorias y financieras.",
    ],
    closing:
      "Trabajar en un entorno regulado cambia cómo construyes. La trazabilidad, el " +
      "permiso mínimo y la revisión de seguridad no son etapas al final del proyecto: " +
      "son condiciones de entrada.",
    flowsLabel: "Flujos que he construido",
    flows: [
      "Firma electrónica",
      "Segundo factor de autenticación",
      "Validación de identidad",
      "Evaluación de riesgo",
      "Renovación y reclasificación de productos de crédito",
    ],
  },

  layers: [
    {
      layer: "edge",
      eyebrow: "Capa de borde",
      title: "Todo empieza en el CDN",
      lead:
        "El contenido se sirve pre-renderizado desde una red de distribución global, " +
        "sin servidor que mantener y con certificado gestionado.",
      points: [
        "HTML estático distribuido en el borde, con caché agresiva para los recursos versionados",
        "Cabeceras de seguridad aplicadas en el origen: HSTS, nosniff, control de marcos y política de contenido",
        "Funciones en el borde para manipular peticiones y respuestas antes de que lleguen al origen",
      ],
    },
    {
      layer: "frontend",
      eyebrow: "Capa de frontend",
      title: "Microfrontends que se componen en runtime",
      lead:
        "Dos aplicaciones distintas, con stacks distintos y despliegues independientes, " +
        "se ensamblan en el navegador del visitante. Esta página es el ejemplo: lo que " +
        "estás leyendo y el chat son piezas separadas.",
      columns: [
        {
          label: "Shell",
          technology: "Next.js · React",
          points: [
            "Orquesta rutas, layout y estado compartido entre los remotos",
            "Module Federation para cargar aplicaciones de otros equipos sin recompilar",
            "Librerías de UI versionadas y consumidas por varios productos",
          ],
        },
        {
          label: "Widget",
          technology: "Angular · Stencil",
          points: [
            "Empaquetado como Web Component, montable en cualquier shell",
            "Sin acoplamiento al framework que lo hospeda",
            "Se despliega solo, sin tocar el shell",
          ],
        },
      ],
    },
    {
      layer: "backend",
      eyebrow: "Capa de backend",
      title: "Servicios con el dominio aislado",
      lead:
        "Construyo microservicios en NestJS y TypeScript sobre arquitectura hexagonal, " +
        "documentados con OpenAPI y cubiertos con pruebas.",
      points: [
        "Puertos y adaptadores que mantienen el núcleo de negocio testeable y portable",
        "APIs públicas y privadas con contratos OpenAPI como fuente de verdad",
        "Arquitectura dirigida por eventos para procesos asíncronos",
        "Escalado a cero: el servicio no consume nada mientras nadie lo llama",
      ],
    },
    {
      layer: "data",
      eyebrow: "Capa de datos",
      title: "Modelado por patrón de acceso",
      lead:
        "Trabajo datos sobre bases NoSQL y relacionales, diseñando el modelo a partir " +
        "de cómo se consulta y no al revés.",
      points: [
        "DynamoDB con diseño de claves orientado a los patrones de acceso reales",
        "Bases relacionales para lo que exige consistencia e integridad referencial",
        "Procesamiento batch en Spark para transformación de datos",
      ],
    },
    {
      layer: "infra",
      eyebrow: "Infraestructura",
      title: "Nada se crea a mano",
      lead:
        "Gestiono infraestructura como código en Terraform, con módulos reutilizables, " +
        "estado remoto y separación por ambiente.",
      points: [
        "Despliegue continuo autenticado por identidad federada, sin llaves de larga vida",
        "Separación entre la capa que puede otorgar permisos y la que automatiza CI",
        "Compuertas de calidad y seguridad obligatorias en cada integración",
        "Rotación de secretos y monitoreo proactivo como parte de la operación",
      ],
    },
  ],

  caseStudy: {
    eyebrow: "Caso de estudio",
    title: "Este sitio es el ejemplo",
    lead:
      "Todo lo que acabas de leer está aplicado aquí mismo. El código es público y la " +
      "infraestructura se define en Terraform, así que cada línea de esta tabla se puede " +
      "verificar en los repositorios.",
    records: [
      { label: "Costo mensual", detail: "0 USD, dentro de la capa gratuita", status: "live" },
      {
        label: "Frontend",
        detail: "Next.js, export estático en Firebase Hosting",
        status: "live",
      },
      {
        label: "Infraestructura",
        detail: "Terraform, dos capas con permisos separados",
        status: "live",
      },
      {
        label: "Autenticación de CI",
        detail: "Workload Identity Federation, sin llaves JSON",
        status: "live",
      },
      {
        label: "Widget",
        detail: "Angular Elements, desplegado y versionado aparte",
        status: "building",
      },
      {
        label: "Backend",
        detail: "NestJS en Cloud Run, escala a cero",
        status: "building",
      },
    ],
    note: {
      title: "La arquitectura hexagonal también está aquí",
      body:
        "No es solo una viñeta de la capa de backend. Este frontend está partido en " +
        "dominio, aplicación e infraestructura: el dominio no importa React, la página " +
        "depende de un puerto y no del archivo que carga el contenido, y una regla de " +
        "linter rompe la compilación si un import apunta hacia adentro. El día que el " +
        "contenido venga del API, cambia una línea del contenedor y nada más se mueve.",
    },
    repositories: [
      {
        href: "https://github.com/alejoavilag/shell-alejoavila-web-ui",
        label: "shell-alejoavila-web-ui",
      },
      {
        href: "https://github.com/alejoavilag/alejoavila-gcp-iac",
        label: "alejoavila-gcp-iac",
      },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    title: "Hablemos",
    lead: "Estoy abierto a posiciones remotas de Senior Full-Stack o Platform Engineer.",
    channels: [
      { href: `mailto:${EMAIL}`, label: EMAIL },
      { href: GITHUB, label: "GitHub" },
      { href: LINKEDIN, label: "LinkedIn" },
    ],
    credit: "Diseñado por Alejandro Ávila, a cuatro manos con Claude",
  },
};

export const staticLandingContentRepository: LandingContentRepository = {
  load: () => CONTENT,
};
