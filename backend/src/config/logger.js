import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // log in console
    new transports.File({ filename: "logs/error.log", level: "error" }), // errors
    new transports.File({ filename: "logs/combined.log" }), // all logs
  ],
});

export default logger;
