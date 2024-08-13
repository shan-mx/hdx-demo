import * as HyperDX from "@hyperdx/node-opentelemetry";
import winston from "winston";
import { env } from "@/env";

const timezoned = () => {
  return new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });
};

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
});

logger.add(
  HyperDX.getWinstonTransport("debug", {
    detectResources: true,
  }),
);

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (env.NODE_ENV !== "production") {
  const logFormat = winston.format.printf((info) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { level, message, timestamp, ...meta } = info;
    const metaString =
      meta && Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : "";

    return `${timestamp} [${level}]: ${message} ${metaString}`;
  });

  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.prettyPrint(),
        winston.format.colorize(),
        logFormat,
      ),
    }),
  );
}
