import router from "./src/routes";
import cors from "cors";
import express from "express";

require("dotenv").config();

const app = express();

const { APP_PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use("/public", express.static(`${__dirname}/public/`));
app.use("/", router);

app.listen(APP_PORT, () => {
  console.log(`Running at localhost:${APP_PORT}`);
});
