import dotenv from "dotenv";
import express from "express";

import errorHandler from "./middlewares/error-handler.middleware";
import router from "./routers/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
