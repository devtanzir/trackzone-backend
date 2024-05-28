import Express from "express";
import { connectDb } from "./db.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(routes);

app.get("/", (_req, res) => {
  res.json({ message: "there is nothing to show" });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});

const PORT = process.env.PORT || 8000 || 5001;
const URL = process.env.DATABASE_URL;

connectDb(URL).then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
