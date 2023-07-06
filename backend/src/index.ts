import cors from "cors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { sampleProducts } from "./data";
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import seedRouter from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";
import { keyRouter } from "./routers/keyRouter";
dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/zuke-ecom";
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("error mongodb");
  });

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use('/api/orders', orderRouter)
app.use('/api/keys', keyRouter)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
