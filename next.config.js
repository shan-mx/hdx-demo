/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

if (process.env.NEXT_RUNTIME === "nodejs") {
  await import("./otel.node.js");
}

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/otel/v1/:path*",
        destination: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/:path*`,
      },
    ];
  },
};

export default config;
