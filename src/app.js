import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./config/logger.js";

// using express
const app = express();

// to pass the json data
app.use(express.json());

// for montioring http request
app.use(morgan("dev"));

// for cors
app.use(cors());

// this is the middle that is used to show the error
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
