import express from "express";
import cors from "cors";
import { connectDb } from "./db"
import routes from "./routes"
import { errorHandler } from "./middleware/errorMiddleware";
import { apiVersionMiddleware } from "./middleware/apiVersionMiddleware";

const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiVersionMiddleware);
app.use("/api", routes)
app.use(errorHandler);

export default app;