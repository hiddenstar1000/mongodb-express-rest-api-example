import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";
import posts from "./routes/posts.js";
import { connectToDatabase } from "./db/conn.js";

const PORT = process.env.PORT || 5050;
const app: Express = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/posts", posts);

// Global error handling
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    console.error(err);
    res.status(500).send("Uh oh! An unexpected error occurred.");
  }
);

// Connect to database and start the Express server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
