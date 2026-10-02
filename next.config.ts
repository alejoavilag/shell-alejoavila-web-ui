import type { NextConfig } from "next";

// Las cabeceras de seguridad (CSP, HSTS) viven en firebase.json: el export
// estático no tiene servidor, así que next.config no puede emitirlas.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
