import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.route.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

// using express
const app = express();

// to pass the json data
app.use(express.json());

// for montioring http request
app.use(morgan("dev"));

const corsOptions = {
  origin: process.env.CLIENT_URL, // allow only frontend URL
  credentials: true, // if you send cookies/auth headers
};

// for cors
app.use(cors(corsOptions));

// routes
app.use("/api/fantasyHub", router);

// this is the middle that is used to show the error
// 404 handler
app.use(notFound);

// Error handler (with logger inside)
app.use(errorHandler);

export default app;
