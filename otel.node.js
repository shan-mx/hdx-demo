import * as HyperDX from "@hyperdx/node-opentelemetry";

HyperDX.init({
  apiKey: process.env.HYPERDX_API_KEY,
  service: process.env.OTEL_SERVICE_NAME,
  betaMode: true,
});
