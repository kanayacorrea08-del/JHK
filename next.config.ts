/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ❗ Compila aunque haya errores de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❗ Compila aunque haya errores TS (no recomendado a largo plazo)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
