# shell-alejoavila-web-ui

Shell del portafolio de Alejandro Ávila — [alejoavila.com](https://alejoavila.com).

Aplicación **Next.js** (React) que se compila a HTML estático y se despliega en
Firebase Hosting. Es el host que compone el sitio: renderiza el contenido propio
y carga en runtime el widget de chat, que vive en su propio repositorio y se
despliega de forma independiente.

## Stack

| | |
|---|---|
| Framework | Next.js 16 · App Router · `output: export` |
| UI | React 19 · Tailwind CSS 4 |
| Lenguaje | TypeScript 6 |
| Runtime | Node.js 24 LTS |
| Hosting | Firebase Hosting |

TypeScript está fijado en la línea 6.x a propósito: el widget de chat usa Angular
22, que exige `typescript >=6.0 <6.1`, y ambos consumen el mismo paquete de
contratos.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera out/
npm run lint
```

El build produce `out/`, que es exactamente lo que se publica. No hay servidor en
producción: todo lo dinámico vive detrás de `/api/**`, servido por un servicio
aparte en Cloud Run mediante un rewrite de Firebase Hosting.

Las cabeceras de seguridad (CSP, HSTS, Trusted Types) se definen en
`firebase.json`, no en `next.config.ts` — un export estático no tiene servidor
que las emita.

## Repositorios relacionados

| Repositorio | Rol |
|---|---|
| `alejoavila-chat-wc-lib-web-ui` | Widget de chat, Angular Elements |
| `alejoavila-api-mngr` | API en NestJS sobre Cloud Run |
| `alejoavila-gcp-iac` | Infraestructura en Terraform |
| `alejoavila-shared-lib` | Contratos compartidos, publicados en npm |

El plan completo, el inventario de contenido y el diseño de métricas están en
`docs/` del proyecto.
