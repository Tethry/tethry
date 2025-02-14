import express, { NextFunction, Request, Response } from "express";
const app = express();
import { ENVIRONMENT } from "./common/config/environment";
import cors from "cors";
import { connectDb } from "./common/config/database";
import authRouter from "./modules/routes/auth/auth.router";
import transferRouter from "./modules/routes/transfer/transfer.routes";
import transactionsRouter from "./modules/routes/transactions/transactions.router";
import cardRouter from "./modules/routes/card/card.router";
import dotenv from "dotenv";

dotenv.config();

// App Security Configurations
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.disable("x-powered-by");

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/transfer", transferRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/card", cardRouter);
// Welcome Message
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to the Point System API",
  });
});

// status check
app.get("*", (req: Request, res: Response) => {
  res.send({
    Time: new Date(),
    status: "running",
  });
});

// error check
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    status: false,
    message: "An unexpected error occurred",
    error: err.message,
  });
});

app.listen(ENVIRONMENT.APP.PORT, () => {
  console.log(
    `${ENVIRONMENT.APP.NAME} Running on http://localhost:${ENVIRONMENT.APP.PORT}`
  );

  connectDb();
});
