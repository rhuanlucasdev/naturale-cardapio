import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`API do Espaco Naturale rodando em http://localhost:${port}`);
});
