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
  const obj = {
    name: "tanzir",
    email: "tanzir@example.com",
    post: 3711,
    address: {
      house: 15,
      road: "04",
      area: "rupnagar R/A",
    },
  };
  res.json(obj);
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});

const PORT = process.env.PORT || 8000 || 5001;

connectDb("mongodb://localhost:27017/track-zone").then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
