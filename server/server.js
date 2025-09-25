import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();
const allowedOrigins = [
  "http://localhost:5173",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

//middlewares
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
