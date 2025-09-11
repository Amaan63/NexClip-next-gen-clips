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

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://your-production-domain.com", // prod
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// routes
app.use("/api/fantasyHub", router);

// this is the middle that is used to show the error
// 404 handler
app.use(notFound);

// Error handler (with logger inside)
app.use(errorHandler);

export default app;
