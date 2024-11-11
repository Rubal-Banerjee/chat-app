import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/v1";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});
