import Express from "express";
import { connectDb } from "../db.js";
import routes from "../routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
// dot env config
dotenv.config();

// Validate environment variables
const requiredEnvVars = ["PORT", "DATABASE_URL"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Environment variable ${varName} is missing`);
    process.exit(1);
  }
});

const app = Express();
// json middleware
app.use(Express.json());
// access all type links
app.use(cors());
// route middleware
app.use(routes);

// default routes
app.get("/", (_req, res) => {
  res.json({ message: "there is nothing to show" });
});
// error handler middleware
app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});
// get data from env file
const PORT = process.env.PORT || 8000;
const URL = process.env.DATABASE_URL;

// invoke connectDB function
connectDb(URL).then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
