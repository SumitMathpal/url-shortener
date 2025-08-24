import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import { errorHandler, AppError } from "./src/utils/errorHandler.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config("./.env");
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", short_url);

app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`connection succesfully ${PORT}`);
});
