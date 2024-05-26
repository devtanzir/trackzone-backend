import Express from "express";
import { connectDb } from "./db.js";

const app = Express();
app.use(Express.json());

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

connectDb("mongodb://localhost:27017/track-zone").then(() => {
  console.log("database connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

const PORT = 5000;
