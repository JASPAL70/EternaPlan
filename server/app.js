import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./Router/messageRouter.js";
import feedbackRouter from "./Router/feedbackRouter.js"; 

dotenv.config({ path: "./.env" });

const app = express();

// Middleware: Enable CORS
app.use(
  cors({
    origin: [process.env.URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware: Parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/feedback", feedbackRouter); 

// Catch invalid API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found!",
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error occurred!",
  });
});

// Connect to the database
dbConnection();


export default app;