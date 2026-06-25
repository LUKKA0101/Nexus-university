import express from "express";
import dotenv from "dotenv";
import router from "./routers/index";
import errorHandler from "./middlewares/error-handler.middleware";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
